import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform,
  type OGLRenderingContext,
} from "ogl";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  image: string;
  text: string;
  subtext?: string;
}

export interface GalleryAPI {
  scrollPrev: () => void;
  scrollNext: () => void;
}

interface CircularGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: GalleryItem[];
  bend?: number;
  borderRadius?: number;
  autoRotateSpeed?: number;
  scrollEase?: number;
  fontClassName?: string;
  onItemClick?: (index: number) => void;
  onInit?: (api: GalleryAPI) => void;
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: object) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof (instance as Record<string, unknown>)[key] === "function") {
      (instance as Record<string, unknown>)[key] = (
        (instance as Record<string, unknown>)[key] as (...a: unknown[]) => unknown
      ).bind(instance);
    }
  });
}

function createTextTexture(
  gl: OGLRenderingContext,
  lines: string[],
  fonts: string[],
  colors: string[],
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  // Measure each line
  const lineMetrics = lines.map((line, i) => {
    ctx.font = fonts[i] ?? fonts[0];
    const w = Math.ceil(ctx.measureText(line).width);
    const size = parseInt(fonts[i] ?? fonts[0], 10);
    const h = Math.ceil(size * 1.3);
    return { w, h };
  });

  const maxW = Math.max(...lineMetrics.map((m) => m.w));
  const totalH = lineMetrics.reduce((s, m) => s + m.h, 0);
  const pad = 16;

  canvas.width = maxW + pad * 2;
  canvas.height = totalH + pad * 2;

  let y = pad;
  lines.forEach((line, i) => {
    ctx.font = fonts[i] ?? fonts[0];
    ctx.fillStyle = colors[i] ?? colors[0];
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillText(line, canvas.width / 2, y);
    y += lineMetrics[i].h;
  });

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  gl: OGLRenderingContext;
  plane: Mesh;
  lines: string[];
  fonts: string[];
  colors: string[];
  sizeRatio: number;
  extraY: number;
  mesh!: Mesh;

  constructor({
    gl, plane, lines, fonts, colors, sizeRatio = 0.14, extraY = 0,
  }: {
    gl: OGLRenderingContext; plane: Mesh;
    lines: string[]; fonts: string[]; colors: string[];
    sizeRatio?: number; extraY?: number;
  }) {
    this.gl = gl; this.plane = plane;
    this.lines = lines; this.fonts = fonts; this.colors = colors;
    this.sizeRatio = sizeRatio; this.extraY = extraY;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.lines, this.fonts, this.colors);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragment: `precision highp float; uniform sampler2D tMap; varying vec2 vUv; void main() { vec4 color = texture2D(tMap, vUv); if (color.a < 0.1) discard; gl_FragColor = color; }`,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * this.sizeRatio;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05 + this.extraY;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  gl: OGLRenderingContext;
  geometry: Plane;
  image: string;
  text: string;
  subtext?: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  viewport: { width: number; height: number };
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  program!: Program;
  plane!: Mesh;
  title?: Title;
  extra: number = 0;
  widthTotal: number = 0;
  width: number = 0;
  x: number = 0;
  scale: number = 1;
  padding: number = 2;
  isBefore: boolean = false;
  isAfter: boolean = false;

  constructor({ geometry, gl, image, text, subtext, index, length, renderer, scene, screen, viewport, bend, textColor, borderRadius = 0, font }: {
    geometry: Plane; gl: OGLRenderingContext; image: string; text: string; subtext?: string;
    index: number; length: number; renderer: Renderer; scene: Transform;
    screen: { width: number; height: number }; viewport: { width: number; height: number };
    bend: number; textColor: string; borderRadius: number; font: string;
  }) {
    this.geometry = geometry; this.gl = gl; this.image = image;
    this.text = text; this.subtext = subtext;
    this.index = index; this.length = length;
    this.renderer = renderer; this.scene = scene;
    this.screen = screen; this.viewport = viewport;
    this.bend = bend; this.textColor = textColor;
    this.borderRadius = borderRadius; this.font = font;
    this.createShader(); this.createMesh(); this.createTitle(); this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false, depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position; attribute vec2 uv;
        uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes; uniform vec2 uPlaneSizes;
        uniform sampler2D tMap; uniform float uBorderRadius;
        varying vec2 vUv;
        float rBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = rBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          gl_FragColor = vec4(color.rgb, 1.0 - smoothstep(-0.002, 0.002, d));
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      const W = img.naturalWidth || 1200;
      const H = img.naturalHeight || 900;
      const cvs = document.createElement("canvas");
      cvs.width = W; cvs.height = H;
      const ctx = cvs.getContext("2d")!;
      ctx.drawImage(img, 0, 0, W, H);

      // Work out which region of the canvas is actually visible on the card
      // (mirrors the shader's object-fit:contain UV logic)
      const imageAspect = W / H;
      const cardAspect = this.plane.scale.y > 0
        ? this.plane.scale.x / this.plane.scale.y
        : 900 / 1000;
      const ratioX = Math.min(cardAspect / imageAspect, 1.0);
      const ratioY = Math.min(imageAspect / cardAspect, 1.0);
      const visLeft = (W * (1 - ratioX)) / 2;
      const visTop  = (H * (1 - ratioY)) / 2;
      const visW = W * ratioX;
      const visH = H * ratioY;

      // Gradient only over visible area
      const grad = ctx.createLinearGradient(0, visTop + visH * 0.38, 0, visTop + visH);
      grad.addColorStop(0, "rgba(10,8,6,0)");
      grad.addColorStop(0.55, "rgba(10,8,6,0.52)");
      grad.addColorStop(1, "rgba(10,8,6,0.88)");
      ctx.fillStyle = grad;
      ctx.fillRect(visLeft, visTop, visW, visH);

      // Clip text to visible region so nothing bleeds outside the card
      ctx.save();
      ctx.beginPath();
      ctx.rect(visLeft, visTop, visW, visH);
      ctx.clip();

      const pad = visLeft + visW * 0.07;
      ctx.textBaseline = "bottom";
      ctx.textAlign = "left";

      if (this.subtext) {
        ctx.font = `600 ${Math.round(visH * 0.038)}px Inter, system-ui, sans-serif`;
        ctx.fillStyle = "rgb(212,167,32)";
        ctx.fillText(this.subtext.toUpperCase(), pad, visTop + visH - visH * 0.135);
      }

      ctx.font = `bold ${Math.round(visH * 0.085)}px 'Bebas Neue', Impact, 'Arial Black', sans-serif`;
      ctx.fillStyle = "rgb(245,240,232)";
      ctx.fillText(this.text, pad, visTop + visH - visH * 0.04);

      ctx.restore();

      texture.image = cvs;
      this.program.uniforms.uImageSizes.value = [W, H];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    // Text is baked into the image texture via createShader — no separate mesh needed.
  }

  update(scroll: { current: number; last: number }, direction: "left" | "right") {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B = Math.abs(this.bend);
      const R = (H * H + B * B) / (2 * B);
      const ex = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - ex * ex);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(ex / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(ex / R);
      }
    }

    const po = this.plane.scale.x / 2;
    const vo = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + po < -vo;
    this.isAfter = this.plane.position.x - po > vo;
    if (direction === "right" && this.isBefore) { this.extra -= this.widthTotal; this.isBefore = this.isAfter = false; }
    if (direction === "left" && this.isAfter) { this.extra += this.widthTotal; this.isBefore = this.isAfter = false; }
  }

  onResize({ screen, viewport }: { screen?: { width: number; height: number }; viewport?: { width: number; height: number } } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (1000 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (780 * this.scale)) / this.screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  container: HTMLElement;
  autoRotateSpeed: number;
  scroll: { ease: number; current: number; target: number; last: number; position?: number };
  isInteracting: boolean = false;
  interactTimer?: ReturnType<typeof setTimeout>;
  onItemClick?: (index: number) => void;
  originalLength: number = 0;
  renderer!: Renderer;
  gl!: OGLRenderingContext;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  mediasImages!: GalleryItem[];
  medias!: Media[];
  start: number = 0;
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf!: number;
  boundOnResize!: () => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: (e: MouseEvent | TouchEvent) => void;

  constructor(container: HTMLElement, {
    items, bend, textColor, borderRadius, font,
    autoRotateSpeed, scrollEase, onItemClick, onInit,
  }: {
    items?: GalleryItem[]; bend: number; textColor: string; borderRadius: number;
    font: string; autoRotateSpeed: number; scrollEase: number;
    onItemClick?: (index: number) => void;
    onInit?: (api: GalleryAPI) => void;
  }) {
    this.container = container;
    this.autoRotateSpeed = autoRotateSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onItemClick = onItemClick;
    autoBind(this);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();

    onInit?.({
      scrollPrev: () => this.scrollBy(-1),
      scrollNext: () => this.scrollBy(1),
    });
  }

  scrollBy(dir: number) {
    if (!this.medias?.[0]) return;
    this.isInteracting = true;
    clearTimeout(this.interactTimer);
    this.scroll.target += dir * this.medias[0].width;
    this.interactTimer = setTimeout(() => { this.isInteracting = false; }, 1200);
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() { this.scene = new Transform(); }
  createGeometry() { this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 }); }

  createMedias(items: GalleryItem[] | undefined, bend: number, textColor: string, borderRadius: number, font: string) {
    const galleryItems = items && items.length > 0 ? items : [];
    this.originalLength = galleryItems.length;
    this.mediasImages = [...galleryItems, ...galleryItems];
    this.medias = this.mediasImages.map((data, index) => new Media({
      geometry: this.planeGeometry, gl: this.gl,
      image: data.image, text: data.text, subtext: data.subtext,
      index, length: this.mediasImages.length,
      renderer: this.renderer, scene: this.scene,
      screen: this.screen, viewport: this.viewport,
      bend, textColor, borderRadius, font,
    }));
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isInteracting = true;
    clearTimeout(this.interactTimer);
    this.scroll.position = this.scroll.current;
    this.start = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isInteracting) return;
    const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const distance = (this.start - x) * 0.05;
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }

  onTouchUp(e: MouseEvent | TouchEvent) {
    const endX = "changedTouches" in e
      ? (e as TouchEvent).changedTouches[0].clientX
      : (e as MouseEvent).clientX;
    const moved = Math.abs(endX - this.start);

    if (moved < 8 && this.onItemClick && this.medias && this.screen && this.viewport) {
      const vpX = (endX / this.screen.width - 0.5) * this.viewport.width;
      let clickedIndex = -1;
      let closestDist = Infinity;
      this.medias.forEach((media, i) => {
        const dist = Math.abs(media.plane.position.x - vpX);
        if (dist < media.plane.scale.x / 2 && dist < closestDist) {
          closestDist = dist; clickedIndex = i;
        }
      });
      if (clickedIndex !== -1 && this.originalLength > 0) {
        this.onItemClick(clickedIndex % this.originalLength);
      }
    }

    clearTimeout(this.interactTimer);
    this.isInteracting = false;
  }

  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const h = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width: h * this.camera.aspect, height: h };
    if (this.medias) this.medias.forEach((m) => m.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  update() {
    // Auto-rotate when not user-interacting
    if (!this.isInteracting && this.autoRotateSpeed) {
      this.scroll.target += this.autoRotateSpeed;
    }
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    if (this.medias) this.medias.forEach((m) => m.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener("resize", this.boundOnResize);
    // NOTE: No wheel listener — page scroll should not affect gallery
    this.container.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    this.container.addEventListener("touchstart", this.boundOnTouchDown, { passive: true });
    window.addEventListener("touchmove", this.boundOnTouchMove, { passive: true });
    window.addEventListener("touchend", this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    clearTimeout(this.interactTimer);
    window.removeEventListener("resize", this.boundOnResize);
    this.container.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    this.container.removeEventListener("touchstart", this.boundOnTouchDown);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);
    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export const CircularGallery = ({
  items,
  bend = 3,
  borderRadius = 0.05,
  autoRotateSpeed = 0.012,
  scrollEase = 0.06,
  className,
  fontClassName,
  onItemClick,
  onInit,
  ...props
}: CircularGalleryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const cs = getComputedStyle(el);
    const color = cs.color || "#1a1a1a";
    const font = `${cs.fontWeight || "600"} ${cs.fontSize || "26px"} ${cs.fontFamily}`;

    const app = new App(el, {
      items, bend, textColor: color, borderRadius,
      font, autoRotateSpeed, scrollEase, onItemClick, onInit,
    });
    return () => app.destroy();
  }, [items, bend, borderRadius, autoRotateSpeed, scrollEase, fontClassName, onItemClick, onInit]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full overflow-hidden cursor-grab active:cursor-grabbing text-foreground font-semibold text-[26px]",
        fontClassName,
        className,
      )}
      {...props}
    />
  );
};
