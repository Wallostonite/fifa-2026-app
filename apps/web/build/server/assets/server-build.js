import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { PassThrough } from 'node:stream';
import { createReadableStreamFromReadable } from '@react-router/node';
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, useNavigate, useLocation, Meta, Links, ScrollRestoration, Scripts, useRouteError, useAsyncError } from 'react-router';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { forwardRef, useEffect, createElement, useRef, useState, Component, useCallback } from 'react';
import { useButton } from '@react-aria/button';
import { f as fetch$1 } from './index-B8q-JaPr.js';
import { toPng } from 'html-to-image';
import { serializeError } from 'serialize-error';
import { Toaster, toast } from 'sonner';
import { useIdleTimer } from 'react-idle-timer';
import { QueryClientProvider, QueryClient, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useLocation as useLocation$1, Link, useParams } from 'react-router-dom';
import { Trophy, X, Home, Radio, Building2, CalendarCheck, MessageSquare, Calendar, DollarSign, User, Menu, Clock, MapPin, ChevronRight, Search, ArrowLeft, Users, Train, Star, Landmark, UtensilsCrossed, Beer, Plus, ThumbsUp, Languages, FileText, ChevronUp, ChevronDown, Trash2, Globe, Check, CheckCircle2 } from 'lucide-react';
import { signIn } from '@hono/auth-js/react';
import { format, formatDistanceToNow } from 'date-fns';
import fg from 'fast-glob';
import 'node:async_hooks';
import 'node:console';
import '@auth/core';
import '@auth/core/providers/credentials';
import '@hono/auth-js';
import '@neondatabase/serverless';
import 'argon2';
import 'hono';
import 'hono/context-storage';
import 'hono/cors';
import 'hono/proxy';
import 'hono/body-limit';
import 'hono/request-id';
import 'hono/factory';
import '@hono/node-server';
import '@hono/node-server/serve-static';
import 'hono/logger';
import 'ws';
import '@auth/core/jwt';
import 'node:path';
import 'node:fs';
import 'node:url';
import '@react-router/dev/routes';
import 'node:fs/promises';

const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}

const entryServer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: 'Module' }));

const JSX_RENDER_ID_ATTRIBUTE_NAME = "data-render-id";
function buildGridPlaceholder(w, h) {
  const size = Math.max(w, h);
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 895 895" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="895" height="895" fill="#E9E7E7"/>
<g>
<line x1="447.505" y1="-23" x2="447.505" y2="901" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="447.505" x2="5.66443" y2="447.505" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="278.068" x2="5.66443" y2="278.068" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="57.1505" x2="5.66443" y2="57.1504" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="61.8051" y1="883.671" x2="61.8051" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="282.495" y1="907" x2="282.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="611.495" y1="907" x2="611.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="832.185" y1="883.671" x2="832.185" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="827.53" x2="5.66443" y2="827.53" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="606.613" x2="5.66443" y2="606.612" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="4.3568" y1="4.6428" x2="889.357" y2="888.643" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="-0.3568" y1="894.643" x2="894.643" y2="0.642772" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.5" cy="441.5" r="163.995" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.911" cy="447.911" r="237.407" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="448" cy="442" r="384.495" stroke="#C0C0C0" stroke-width="1.00975"/>
</g>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
function useOptionalRef(ref) {
  const fallbackRef = useRef(null);
  if (ref && "instance" in ref) return fallbackRef;
  return ref ?? fallbackRef;
}
const CreatePolymorphicComponent = /* @__PURE__ */ forwardRef(
  // @ts-expect-error -- generic forwardRef signature doesn't propagate the As type param
  function CreatePolymorphicComponentRender({
    as,
    children,
    renderId,
    onError,
    ...rest
  }, forwardedRef) {
    const props = as === "img" ? {
      ...rest,
      // keep the original type of onError for <img>
      onError: (e) => {
        if (typeof onError === "function") onError(e);
        const img = e.currentTarget;
        const {
          width,
          height
        } = img.getBoundingClientRect();
        img.dataset.hasFallback = "1";
        img.onerror = null;
        img.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
        img.style.objectFit = "cover";
      }
    } : rest;
    const ref = useOptionalRef(forwardedRef);
    useEffect(() => {
      const el = ref && "current" in ref ? ref.current : null;
      if (!el) return;
      if (as !== "img") {
        const placeholder = () => {
          const {
            width,
            height
          } = el.getBoundingClientRect();
          return buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
        };
        const applyBgFallback = () => {
          el.dataset.hasFallback = "1";
          el.style.backgroundImage = `url("${placeholder()}")`;
          el.style.backgroundSize = "cover";
        };
        const probeBg = () => {
          const bg = getComputedStyle(el).backgroundImage;
          const match = /url\(["']?(.+?)["']?\)/.exec(bg);
          const src = match?.[1];
          if (!src) return;
          const probe = new Image();
          probe.onerror = applyBgFallback;
          probe.src = src;
        };
        probeBg();
        const ro2 = new ResizeObserver(([entry]) => {
          if (!el.dataset.hasFallback) return;
          const {
            width,
            height
          } = entry.contentRect;
          el.style.backgroundImage = `url("${buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128)}")`;
        });
        ro2.observe(el);
        const mo = new MutationObserver(probeBg);
        mo.observe(el, {
          attributes: true,
          attributeFilter: ["style", "class"]
        });
        return () => {
          ro2.disconnect();
          mo.disconnect();
        };
      }
      if (!el.dataset.hasFallback) return;
      const ro = new ResizeObserver(([entry]) => {
        const {
          width,
          height
        } = entry.contentRect;
        el.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, [as, ref]);
    return /* @__PURE__ */ createElement(as, Object.assign({}, props, {
      ref,
      ...renderId ? {
        [JSX_RENDER_ID_ATTRIBUTE_NAME]: renderId
      } : void 0
    }), children);
  }
);

function LoadFonts() {
  return /* @__PURE__ */ jsx(Fragment, {});
}

function useDevServerHeartbeat() {
  useIdleTimer({
    disabled: typeof window === "undefined",
    throttle: 6e4 * 3,
    timeout: 6e4,
    onAction: () => {
      fetch("/", {
        method: "GET"
      }).catch((error) => {
      });
    }
  });
}

if (typeof window !== "undefined") {
  void import('vanilla-colorful/hex-color-picker.js');
}

const links = () => [];
if (globalThis.window && globalThis.window !== void 0) {
  globalThis.window.fetch = fetch$1;
}
const LoadFontsSSR = LoadFonts ;
function InternalErrorBoundary({
  error: errorArg
}) {
  const routeError = useRouteError();
  const asyncError = useAsyncError();
  const error = errorArg ?? asyncError ?? routeError;
  const [isOpen, setIsOpen] = useState(false);
  const shouldScale = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const scaleFactor = shouldScale ? 1.02 : 1;
  const copyButtonTextClass = shouldScale ? "text-sm" : "text-xs";
  const copyButtonPaddingClass = shouldScale ? "px-[10px] py-[5px]" : "px-[6px] py-[3px]";
  const postCountRef = useRef(0);
  const lastPostTimeRef = useRef(0);
  const lastErrorKeyRef = useRef(null);
  const MAX_ERROR_POSTS_PER_ERROR = 5;
  const THROTTLE_MS = 1e3;
  useEffect(() => {
    const serialized = serializeError(error);
    const errorKey = JSON.stringify(serialized);
    if (errorKey !== lastErrorKeyRef.current) {
      lastErrorKeyRef.current = errorKey;
      postCountRef.current = 0;
    }
    if (postCountRef.current >= MAX_ERROR_POSTS_PER_ERROR) {
      return;
    }
    const now = Date.now();
    const timeSinceLastPost = now - lastPostTimeRef.current;
    const post = () => {
      if (postCountRef.current >= MAX_ERROR_POSTS_PER_ERROR) {
        return;
      }
      postCountRef.current += 1;
      lastPostTimeRef.current = Date.now();
      window.parent.postMessage({
        type: "sandbox:error:detected",
        error: serialized
      }, "*");
    };
    if (timeSinceLastPost < THROTTLE_MS) {
      const timer = setTimeout(post, THROTTLE_MS - timeSinceLastPost);
      return () => clearTimeout(timer);
    }
    post();
  }, [error]);
  useEffect(() => {
    const animateTimer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(animateTimer);
  }, []);
  const {
    buttonProps: copyButtonProps
  } = useButton({
    onPress: useCallback(() => {
      const toastScale = shouldScale ? 1.2 : 1;
      const toastStyle = {
        padding: `${16 * toastScale}px`,
        background: "#18191B",
        border: "1px solid #2C2D2F",
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: `${280 * toastScale}px`,
        fontSize: `${13 * toastScale}px`,
        display: "flex",
        alignItems: "center",
        gap: `${6 * toastScale}px`,
        justifyContent: "flex-start",
        margin: "0 auto"
      };
      navigator.clipboard.writeText(JSON.stringify(serializeError(error)));
      toast.custom(() => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        style: toastStyle,
        renderId: "render-54399fe3",
        as: "div",
        children: [/* @__PURE__ */ jsxs("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor",
          height: "20",
          width: "20",
          children: [/* @__PURE__ */ jsx("title", {
            children: "Success"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            fillRule: "evenodd",
            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
            clipRule: "evenodd",
            renderId: "render-fedb4f53",
            as: "path"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-e79a63a3",
          as: "span",
          children: "Copied successfully!"
        })]
      }), {
        id: "copy-error-success",
        duration: 3e3
      });
    }, [error, shouldScale])
  }, useRef(null));
  function isInIframe() {
    try {
      return window.parent !== window;
    } catch {
      return true;
    }
  }
  return /* @__PURE__ */ jsx(Fragment, {
    children: !isInIframe() && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: `fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-md z-50 transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`,
      style: {
        width: "75vw"
      },
      renderId: "render-1a35fb81",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-[#18191B] text-[#F2F2F2] rounded-lg p-4 shadow-lg w-full",
        style: scaleFactor !== 1 ? {
          transform: `scale(${scaleFactor})`,
          transformOrigin: "bottom center"
        } : void 0,
        renderId: "render-e6d40a59",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-start gap-3",
          renderId: "render-11cc0ee5",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex-shrink-0",
            renderId: "render-f8d80eba",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center",
              renderId: "render-fbda6e25",
              as: "div",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-black text-[1.125rem] leading-none",
                renderId: "render-c954131c",
                as: "span",
                children: "!"
              })
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-2 flex-1",
            renderId: "render-2850d56e",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex flex-col gap-1",
              renderId: "render-9a5a27f7",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "font-light text-[#F2F2F2] text-sm",
                renderId: "render-10db4ecc",
                as: "p",
                children: "App Error Detected"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-[#959697] text-sm font-light",
                renderId: "render-42fb1464",
                as: "p",
                children: "It looks like an error occurred while trying to use your app."
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white ${copyButtonTextClass} ${copyButtonPaddingClass} w-fit`,
              type: "button",
              ...copyButtonProps,
              renderId: "render-84c8a9fa",
              as: "button",
              children: "Copy error"
            })]
          })]
        })
      })
    })
  });
}
class ErrorBoundaryWrapper extends Component {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx(InternalErrorBoundary, {
        error: this.state.error,
        params: {}
      });
    }
    return this.props.children;
  }
}
function LoaderWrapper({
  loader
}) {
  return /* @__PURE__ */ jsx(Fragment, {
    children: loader()
  });
}
const ClientOnly = ({
  loader
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return /* @__PURE__ */ jsx(ErrorBoundaryWrapper, {
    children: isMounted ? /* @__PURE__ */ jsx(LoaderWrapper, {
      loader
    }) : null
  });
};
function useHmrConnection() {
  const [connected, setConnected] = useState(() => false);
  useEffect(() => {
    return;
  }, []);
  return connected;
}
const healthyResponseType = "sandbox:web:healthcheck:response";
const useHandshakeParent = () => {
  const isHmrConnected = useHmrConnection();
  useEffect(() => {
    const healthyResponse = {
      type: healthyResponseType,
      healthy: isHmrConnected,
      supportsErrorDetected: true
    };
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:web:healthcheck") {
        window.parent.postMessage(healthyResponse, "*");
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage(healthyResponse, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isHmrConnected]);
};
const waitForScreenshotReady = async () => {
  const images = Array.from(document.images);
  await Promise.all([
    // make sure custom fonts are loaded
    "fonts" in document ? document.fonts.ready : Promise.resolve(),
    ...images.map((img) => new Promise((resolve) => {
      img.crossOrigin = "anonymous";
      if (img.complete) {
        resolve(true);
        return;
      }
      img.onload = () => resolve(true);
      img.onerror = () => resolve(true);
    }))
  ]);
  await new Promise((resolve) => setTimeout(resolve, 250));
};
const useHandleScreenshotRequest = () => {
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data.type === "sandbox:web:screenshot:request") {
        try {
          await waitForScreenshotReady();
          const width = window.innerWidth;
          const aspectRatio = 16 / 9;
          const height = Math.floor(width / aspectRatio);
          const dataUrl = await toPng(document.body, {
            cacheBust: true,
            skipFonts: false,
            width,
            height,
            style: {
              // force snapshot sizing
              width: `${width}px`,
              height: `${height}px`,
              margin: "0"
            }
          });
          window.parent.postMessage({
            type: "sandbox:web:screenshot:response",
            dataUrl
          }, "*");
        } catch (error) {
          window.parent.postMessage({
            type: "sandbox:web:screenshot:error",
            error: error instanceof Error ? error.message : String(error)
          }, "*");
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
};
function Layout({
  children
}) {
  useHandshakeParent();
  useHandleScreenshotRequest();
  useDevServerHeartbeat();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname;
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:navigation") {
        navigate(event.data.pathname);
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({
      type: "sandbox:web:ready"
    }, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);
  useEffect(() => {
    if (pathname) {
      window.parent.postMessage({
        type: "sandbox:web:navigation",
        pathname
      }, "*");
    }
  }, [pathname]);
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
        type: "module",
        src: "/src/__create/dev-error-overlay.js"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "/src/__create/favicon.png"
      }), LoadFontsSSR ? /* @__PURE__ */ jsx(LoadFontsSSR, {}) : null]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(ClientOnly, {
        loader: () => children
      }), /* @__PURE__ */ jsx(Toaster, {
        position: isMobile ? "top-center" : "bottom-right"
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx("link", {
        rel: "preconnect",
        href: "https://ka-p.fontawesome.com",
        crossOrigin: "anonymous"
      }), /* @__PURE__ */ jsx("link", {
        rel: "stylesheet",
        href: "https://ka-p.fontawesome.com/releases/v6.3.0/css/pro.min.css?token=2c15cc0cc7",
        crossOrigin: "anonymous"
      })]
    })]
  });
}
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(InternalErrorBoundary);
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});

const route0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ClientOnly,
  ErrorBoundary,
  Layout,
  default: root,
  links,
  useHandleScreenshotRequest,
  useHmrConnection
}, Symbol.toStringTag, { value: 'Module' }));

const NAV_ITEMS = [{
  href: "/",
  label: "Home",
  icon: Home
}, {
  href: "/schedule",
  label: "Live Scores",
  icon: Radio
}, {
  href: "/cities",
  label: "Cities",
  icon: Building2
}, {
  href: "/events",
  label: "Events",
  icon: CalendarCheck
}, {
  href: "/forums",
  label: "Forums",
  icon: MessageSquare
}, {
  href: "/my-matches",
  label: "My Matches",
  icon: Calendar
}, {
  href: "/logistics",
  label: "Logistics",
  icon: DollarSign
}, {
  href: "/profile",
  label: "Profile",
  icon: User
}];
function Nav({
  children
}) {
  const {
    pathname
  } = useLocation$1();
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "flex min-h-screen bg-gray-950",
    renderId: "render-32a05cc6",
    as: "div",
    children: [open && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "fixed inset-0 bg-black/60 z-20 lg:hidden",
      onClick: () => setOpen(false),
      renderId: "render-a934eb87",
      as: "div"
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: `
        fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-30
        flex flex-col transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex
      `,
      renderId: "render-86d0cb93",
      as: "aside",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-3 px-6 py-5 border-b border-gray-800",
        renderId: "render-a1787195",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-8 h-8 rounded-lg bg-[#FF415B] flex items-center justify-center",
          renderId: "render-6af8947c",
          as: "div",
          children: /* @__PURE__ */ jsx(Trophy, {
            size: 16,
            className: "text-white"
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-lg font-bold text-white tracking-tight",
          renderId: "render-2359c75d",
          as: "span",
          children: "FanPass"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "ml-auto lg:hidden text-gray-400 hover:text-white",
          onClick: () => setOpen(false),
          renderId: "render-41e9cb1a",
          as: "button",
          children: /* @__PURE__ */ jsx(X, {
            size: 20
          })
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex-1 px-3 py-4 space-y-1 overflow-y-auto",
        renderId: "render-c51f4270",
        as: "nav",
        children: NAV_ITEMS.map(({
          href,
          label,
          icon: Icon
        }) => {
          const active = pathname === href;
          return /* @__PURE__ */ jsxs(Link, {
            to: href,
            onClick: () => setOpen(false),
            className: `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${active ? "bg-[#FF415B]/15 text-[#FF415B] border border-[#FF415B]/20" : "text-gray-400 hover:text-white hover:bg-gray-800"}
                `,
            children: [/* @__PURE__ */ jsx(Icon, {
              size: 18
            }), label]
          }, href);
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "px-5 py-4 border-t border-gray-800",
        renderId: "render-f081a370",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-xs text-gray-600",
          renderId: "render-2e11886e",
          as: "p",
          children: "FIFA World Cup 2026™"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-xs text-gray-600",
          renderId: "render-8e71b68a",
          as: "p",
          children: "Jun 11 – Jul 19, 2026"
        })]
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex-1 flex flex-col min-w-0 lg:ml-0",
      renderId: "render-4b85433c",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "lg:hidden flex items-center gap-3 px-4 py-3 bg-gray-900 border-b border-gray-800 sticky top-0 z-10",
        renderId: "render-5a47a51f",
        as: "header",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setOpen(true),
          className: "text-gray-400 hover:text-white",
          renderId: "render-e331b4c4",
          as: "button",
          children: /* @__PURE__ */ jsx(Menu, {
            size: 22
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2",
          renderId: "render-535c1945",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-6 h-6 rounded bg-[#FF415B] flex items-center justify-center",
            renderId: "render-994cc66d",
            as: "div",
            children: /* @__PURE__ */ jsx(Trophy, {
              size: 12,
              className: "text-white"
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-bold text-white text-sm",
            renderId: "render-e0ecfc89",
            as: "span",
            children: "FanPass"
          })]
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex-1 overflow-auto",
        renderId: "render-f2a8d489",
        as: "main",
        children
      })]
    })]
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});
function RootLayout({
  children
}) {
  return /* @__PURE__ */ jsx(QueryClientProvider, {
    client: queryClient,
    children: /* @__PURE__ */ jsx(Nav, {
      children
    })
  });
}

const KEY = "fanpass_prefs";
const DEFAULTS = {
  country: null,
  countryFlag: null,
  team: null,
  language: "en"
};
function usePreferences() {
  const [prefs, setPrefs] = useState(DEFAULTS);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setPrefs({
        ...DEFAULTS,
        ...JSON.parse(stored)
      });
    } catch {}
    setLoaded(true);
  }, []);
  const save = updates => {
    const next = {
      ...prefs,
      ...updates
    };
    setPrefs(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };
  const clear = () => {
    setPrefs(DEFAULTS);
    try {
      localStorage.removeItem(KEY);
    } catch {}
  };
  return {
    prefs,
    save,
    clear,
    loaded,
    hasPrefs: !!(prefs.country && prefs.team)
  };
}

function StatCard({
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "bg-gray-900 border border-gray-800 rounded-2xl p-5",
    renderId: "render-a00bb2e1",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "text-3xl font-bold text-white mb-1",
      renderId: "render-e6ea9278",
      as: "div",
      children: value
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "text-sm font-medium text-gray-300",
      renderId: "render-e4fe27b0",
      as: "div",
      children: label
    }), sub && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "text-xs text-gray-500 mt-0.5",
      renderId: "render-5918cb6d",
      as: "div",
      children: sub
    })]
  });
}
function QuickLink({
  href,
  icon: Icon,
  label,
  desc,
  accent
}) {
  return /* @__PURE__ */ jsxs(Link, {
    to: href,
    className: `flex items-center gap-4 p-4 rounded-2xl border transition-colors group
      ${accent ? "bg-[#FF415B] border-[#FF415B] hover:bg-[#e03550]" : "bg-gray-900 border-gray-800 hover:border-gray-700"}`,
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: `w-10 h-10 rounded-xl flex items-center justify-center shrink-0
        ${accent ? "bg-white/20" : "bg-[#FF415B]/10"}`,
      renderId: "render-2ad03d87",
      as: "div",
      children: /* @__PURE__ */ jsx(Icon, {
        size: 20,
        className: accent ? "text-white" : "text-[#FF415B]"
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "min-w-0 flex-1",
      renderId: "render-e4b071b4",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-sm font-semibold text-white",
        renderId: "render-91d07067",
        as: "p",
        children: label
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: `text-xs ${accent ? "text-white/70" : "text-gray-500"}`,
        renderId: "render-e3a0371d",
        as: "p",
        children: desc
      })]
    }), /* @__PURE__ */ jsx(ChevronRight, {
      size: 16,
      className: `shrink-0 ${accent ? "text-white/60" : "text-gray-600 group-hover:text-gray-400"}`
    })]
  });
}
function Page$9() {
  const {
    prefs,
    hasPrefs
  } = usePreferences();
  const {
    data: liveMatches = []
  } = useQuery({
    queryKey: ["homeLive"],
    queryFn: () => fetch("/api/live-scores?status=live").then((r) => r.json()).catch(() => []),
    refetchInterval: 3e4
  });
  const {
    data: allMatches = []
  } = useQuery({
    queryKey: ["homeMatches"],
    queryFn: () => fetch("/api/matches").then((r) => r.json()).catch(() => [])
  });
  const {
    data: teamMatches = []
  } = useQuery({
    queryKey: ["homeTeamMatches", prefs.team],
    queryFn: () => fetch(`/api/matches?team=${encodeURIComponent(prefs.team)}`).then((r) => r.json()).catch(() => []),
    enabled: !!prefs.team
  });
  const upcoming = allMatches.filter((m) => new Date(m.match_date) > /* @__PURE__ */ new Date()).slice(0, 4);
  const nextTeamMatch = teamMatches.find((m) => new Date(m.match_date) > /* @__PURE__ */ new Date());
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "max-w-5xl mx-auto px-4 sm:px-6 py-8",
    renderId: "render-3482d735",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "mb-8",
      renderId: "render-ca08b9e9",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-2 mb-3",
        renderId: "render-13ed696b",
        as: "div",
        children: [/* @__PURE__ */ jsx(Trophy, {
          size: 18,
          className: "text-[#FF415B]"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-xs font-semibold text-[#FF415B] uppercase tracking-widest",
          renderId: "render-19c6347b",
          as: "span",
          children: "FIFA World Cup 2026™"
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-4xl font-bold text-white mb-2",
        renderId: "render-33232409",
        as: "h1",
        children: "Welcome to FanPass"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-gray-400 text-lg",
        renderId: "render-62b31819",
        as: "p",
        children: "Your companion for the biggest tournament on earth."
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-gray-600 text-sm mt-1",
        renderId: "render-1a8c6a69",
        as: "p",
        children: "Jun 11 – Jul 19, 2026 · USA · Canada · Mexico"
      })]
    }), liveMatches.length > 0 && /* @__PURE__ */ jsx(Link, {
      to: "/schedule",
      className: "block mb-6",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-[#FF415B] rounded-2xl p-5 hover:bg-[#e03550] transition-colors",
        renderId: "render-9dd3e110",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2 mb-4",
          renderId: "render-56d4c727",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-2.5 h-2.5 rounded-full bg-white live-pulse",
            renderId: "render-92bcb31a",
            as: "span"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-xs font-bold text-white uppercase tracking-widest",
            renderId: "render-69de090e",
            as: "span",
            children: ["Live Now · ", liveMatches.length, " Match", liveMatches.length > 1 ? "es" : ""]
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "space-y-2.5",
          renderId: "render-62605090",
          as: "div",
          children: liveMatches.slice(0, 3).map((m) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center gap-3",
            renderId: "render-5dacfbdb",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-2xl",
              renderId: "render-5c9f6257",
              as: "span",
              children: m.team1_flag
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "font-bold text-white text-xl tabular-nums w-16 text-center",
              renderId: "render-69799817",
              as: "span",
              children: [m.team1_score ?? 0, " – ", m.team2_score ?? 0]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-2xl",
              renderId: "render-de50b6b4",
              as: "span",
              children: m.team2_flag
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-white/80 text-sm flex-1 truncate",
              renderId: "render-6a1c990d",
              as: "span",
              children: [m.team1, " vs ", m.team2]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-white/60 text-xs bg-white/15 rounded-md px-2 py-0.5 shrink-0",
              renderId: "render-3d194981",
              as: "span",
              children: m.status === "half-time" ? "HT" : `${m.match_minute ?? 0}'`
            })]
          }, m.id))
        })]
      })
    }), !hasPrefs && /* @__PURE__ */ jsx(Link, {
      to: "/profile",
      className: "block mb-6",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-gray-900 border border-dashed border-gray-700 hover:border-[#FF415B]/50 rounded-2xl p-5 flex items-center gap-4 transition-colors group",
        renderId: "render-02610a8f",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-10 h-10 rounded-xl bg-gray-800 group-hover:bg-[#FF415B]/10 flex items-center justify-center shrink-0 transition-colors",
          renderId: "render-7680d731",
          as: "div",
          children: /* @__PURE__ */ jsx(User, {
            size: 20,
            className: "text-gray-500 group-hover:text-[#FF415B] transition-colors"
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex-1",
          renderId: "render-c7082cd0",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-semibold text-white text-sm",
            renderId: "render-d609f20c",
            as: "p",
            children: "Personalise FanPass"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-gray-500",
            renderId: "render-26cce6c1",
            as: "p",
            children: "Pick your country and team to see your schedule, fan zones and more →"
          })]
        })]
      })
    }), hasPrefs && nextTeamMatch && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "mb-6",
      renderId: "render-d2334259",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center justify-between mb-3",
        renderId: "render-86c92410",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2",
          renderId: "render-7b8f8d3b",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg",
            renderId: "render-3e46c95a",
            as: "span",
            children: prefs.countryFlag
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-bold text-white text-sm",
            renderId: "render-1cf4e0b2",
            as: "h2",
            children: "Your Next Match"
          })]
        }), /* @__PURE__ */ jsx(Link, {
          to: "/schedule",
          className: "text-xs text-[#FF415B] hover:underline",
          children: "Full schedule →"
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-gray-900 border border-gray-800 rounded-2xl p-5",
        renderId: "render-f385ec15",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2 mb-4",
          renderId: "render-59d7f49d",
          as: "div",
          children: [/* @__PURE__ */ jsx(Clock, {
            size: 13,
            className: "text-gray-500"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-xs text-gray-500",
            renderId: "render-9222f546",
            as: "span",
            children: [new Date(nextTeamMatch.match_date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric"
            }), " · ", new Date(nextTeamMatch.match_date).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-[#FF415B] bg-[#FF415B]/10 px-2 py-0.5 rounded-full ml-auto",
            renderId: "render-5cc48fb3",
            as: "span",
            children: nextTeamMatch.tournament
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-center gap-6",
          renderId: "render-69ed8352",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col items-center gap-1",
            renderId: "render-e0b4cd7b",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-4xl",
              renderId: "render-7de9f875",
              as: "span",
              children: nextTeamMatch.team1_flag
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `text-sm font-bold ${nextTeamMatch.team1 === prefs.team ? "text-[#FF415B]" : "text-white"}`,
              renderId: "render-99e05410",
              as: "span",
              children: nextTeamMatch.team1
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-gray-600 font-bold text-xl",
            renderId: "render-90fd33ad",
            as: "span",
            children: "vs"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col items-center gap-1",
            renderId: "render-8241c28c",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-4xl",
              renderId: "render-432b294e",
              as: "span",
              children: nextTeamMatch.team2_flag
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `text-sm font-bold ${nextTeamMatch.team2 === prefs.team ? "text-[#FF415B]" : "text-white"}`,
              renderId: "render-72f34eee",
              as: "span",
              children: nextTeamMatch.team2
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-gray-800 text-xs text-gray-500",
          renderId: "render-43374c8e",
          as: "div",
          children: [/* @__PURE__ */ jsx(MapPin, {
            size: 12
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-9687ad57",
            as: "span",
            children: [nextTeamMatch.venue, " · ", nextTeamMatch.location]
          })]
        })]
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8",
      renderId: "render-be3ab2fa",
      as: "div",
      children: [/* @__PURE__ */ jsx(StatCard, {
        label: "Teams",
        value: "48",
        sub: "From 6 confederations"
      }), /* @__PURE__ */ jsx(StatCard, {
        label: "Matches",
        value: "104",
        sub: "Group stage to Final"
      }), /* @__PURE__ */ jsx(StatCard, {
        label: "Host Cities",
        value: "16",
        sub: "USA · Canada · Mexico"
      }), /* @__PURE__ */ jsx(StatCard, {
        label: "Days",
        value: "39",
        sub: "Jun 11 – Jul 19"
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "text-lg font-bold text-white mb-4",
      renderId: "render-986d0f4e",
      as: "h2",
      children: "Explore"
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10",
      renderId: "render-77f708f4",
      as: "div",
      children: [/* @__PURE__ */ jsx(QuickLink, {
        href: "/schedule",
        icon: Radio,
        label: "Live Scores & Fixtures",
        desc: "All 104 matches · refreshes every 30s",
        accent: true
      }), /* @__PURE__ */ jsx(QuickLink, {
        href: "/cities",
        icon: Building2,
        label: "Host Cities",
        desc: "16 cities and 16 stadiums"
      }), /* @__PURE__ */ jsx(QuickLink, {
        href: "/events",
        icon: CalendarCheck,
        label: "Fan Events",
        desc: "Meetups, watch parties & tours"
      }), /* @__PURE__ */ jsx(QuickLink, {
        href: "/forums",
        icon: MessageSquare,
        label: "Fan Forums",
        desc: "Discuss with fans worldwide"
      }), /* @__PURE__ */ jsx(QuickLink, {
        href: "/my-matches",
        icon: Calendar,
        label: "My Matches",
        desc: "Book and track your tickets"
      }), /* @__PURE__ */ jsx(QuickLink, {
        href: "/logistics",
        icon: DollarSign,
        label: "Logistics",
        desc: "Currency, phrases & visa info"
      })]
    }), upcoming.length > 0 && /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center justify-between mb-4",
        renderId: "render-9cff119e",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-lg font-bold text-white",
          renderId: "render-f27eb210",
          as: "h2",
          children: hasPrefs ? `All Upcoming Matches` : "Next Up"
        }), /* @__PURE__ */ jsx(Link, {
          to: "/schedule",
          className: "text-sm text-[#FF415B] hover:underline",
          children: "View all →"
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "space-y-3",
        renderId: "render-d4ac45a8",
        as: "div",
        children: upcoming.map((m) => {
          const d = new Date(m.match_date);
          return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-4",
            renderId: "render-4670fa4a",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-center w-14 shrink-0",
              renderId: "render-7607f3c4",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs font-semibold text-gray-400",
                renderId: "render-5d6340f3",
                as: "p",
                children: d.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-gray-600",
                renderId: "render-f340b05e",
                as: "p",
                children: d.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit"
                })
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex-1 flex items-center justify-center gap-3 min-w-0",
              renderId: "render-d5b71ca3",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-2xl",
                renderId: "render-169c2d4f",
                as: "span",
                children: m.team1_flag
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm font-semibold text-white hidden sm:block truncate max-w-[80px]",
                renderId: "render-efefc659",
                as: "span",
                children: m.team1
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-gray-500 font-bold px-2 py-1 bg-gray-800 rounded-lg",
                renderId: "render-6e31b9df",
                as: "span",
                children: "vs"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm font-semibold text-white hidden sm:block truncate max-w-[80px]",
                renderId: "render-488226c3",
                as: "span",
                children: m.team2
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-2xl",
                renderId: "render-62c3c03c",
                as: "span",
                children: m.team2_flag
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-right shrink-0 max-w-[120px]",
              renderId: "render-5f552245",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-gray-400 truncate",
                renderId: "render-dee2d816",
                as: "p",
                children: m.venue
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-[10px] text-[#FF415B] bg-[#FF415B]/10 px-2 py-0.5 rounded-full",
                renderId: "render-5fcd2024",
                as: "span",
                children: m.tournament
              })]
            })]
          }, m.id);
        })
      })]
    })]
  });
}

const page$k = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Page$9, {
      ...props
    })
  });
});

const route1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$k
}, Symbol.toStringTag, { value: 'Module' }));

const isDev = process.env.NEXT_PUBLIC_CREATE_ENV === "DEVELOPMENT";
const PROVIDER_LABELS = {
  google: "Google",
  facebook: "Facebook",
  twitter: "Twitter / X",
  apple: "Apple"
};
function SocialDevShimPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isDev) {
      navigate("/");
    }
  }, [navigate]);
  if (!isDev) {
    return null;
  }
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const provider = params.get("provider") || "google";
  const callbackUrl = params.get("callbackUrl") || "/";
  const label = PROVIDER_LABELS[provider] || provider;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [missingSecrets, setMissingSecrets] = useState(null);
  useEffect(() => {
    fetch(`/api/__create/check-social-secrets?provider=${encodeURIComponent(provider)}`).then((r) => r.json()).then((data) => setMissingSecrets(data.missing || [])).catch((err) => {
      console.error("Failed to check social secrets:", err);
    });
  }, [provider]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn("dev-social", {
        email,
        name,
        provider,
        callbackUrl
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed. Please try again.");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "min-h-screen flex items-center justify-center font-sans bg-gray-100",
    renderId: "render-8378ea5c",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "bg-white rounded-xl p-8 w-full max-w-[400px] shadow-md",
      renderId: "render-e220f8f1",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-amber-50 border border-amber-400 rounded-lg p-3 mb-4 text-[13px] text-amber-800",
        renderId: "render-76b8c442",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-af47340b",
          as: "strong",
          children: "Development Mode"
        }), " — This is a simulated", " ", label, " sign-in. In production, users will see the real", " ", label, " OAuth screen."]
      }), error && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-red-50 border border-red-400 rounded-lg p-3 mb-4 text-[13px] text-red-900",
        renderId: "render-e111f2c4",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-7b048069",
          as: "strong",
          children: "Sign-in error"
        }), " — ", error]
      }), missingSecrets && missingSecrets.length > 0 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-red-50 border border-red-400 rounded-lg p-3 mb-4 text-[13px] text-red-900",
        renderId: "render-d3de9a06",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-d24c2b0f",
          as: "strong",
          children: "Missing secrets"
        }), " — ", label, " sign-in won't work in production until you add these secrets to your project:", " ", missingSecrets.map((s) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-red-200 px-1 rounded text-[12px]",
          renderId: "render-5d4df81b",
          as: "code",
          children: s
        }, s))]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mt-0 mb-6 text-xl font-semibold",
        renderId: "render-c3d98f84",
        as: "h2",
        children: ["Sign in with ", label]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onSubmit: handleSubmit,
        renderId: "render-c3368441",
        as: "form",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "block mb-4",
          renderId: "render-d546f8f0",
          as: "label",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-sm font-medium mb-1.5",
            renderId: "render-fc780dce",
            as: "span",
            children: "Email"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            type: "email",
            required: true,
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "test@example.com",
            className: "w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm",
            renderId: "render-6ca298ba",
            as: "input"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "block mb-6",
          renderId: "render-35678b05",
          as: "label",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "block text-sm font-medium mb-1.5",
            renderId: "render-8c8ddd2a",
            as: "span",
            children: ["Display Name", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-gray-400",
              renderId: "render-25bb20ef",
              as: "span",
              children: "(optional)"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "Test User",
            className: "w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm",
            renderId: "render-4226a823",
            as: "input"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          type: "submit",
          disabled: loading,
          className: "w-full py-2.5 rounded-lg border-none text-white text-sm font-medium bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-default cursor-pointer",
          renderId: "render-49839d73",
          as: "button",
          children: loading ? "Signing in..." : `Continue as ${label} user`
        })]
      })]
    })
  });
}

const page$j = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(SocialDevShimPage, {
      ...props
    })
  });
});

const route2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$j
}, Symbol.toStringTag, { value: 'Module' }));

const COUNTRIES$2 = ["All", "USA", "Canada", "Mexico"];
function Cities() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const {
    data: cities = [],
    isLoading
  } = useQuery({
    queryKey: ["cities"],
    queryFn: () => fetch("/api/cities").then((r) => r.json())
  });
  const filtered = cities.filter((c) => {
    const matchC = country === "All" || c.country === country;
    const matchS = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.stadium.toLowerCase().includes(search.toLowerCase());
    return matchC && matchS;
  });
  const grouped = filtered.reduce((acc, c) => {
    if (!acc[c.country]) acc[c.country] = [];
    acc[c.country].push(c);
    return acc;
  }, {});
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "max-w-5xl mx-auto px-4 sm:px-6 py-8",
    renderId: "render-6401631a",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "text-3xl font-bold text-white mb-1",
      renderId: "render-d3cc0ab3",
      as: "h1",
      children: "Host Cities"
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "text-gray-500 text-sm mb-6",
      renderId: "render-43cb47fa",
      as: "p",
      children: "16 cities across USA, Canada & Mexico"
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative mb-4",
      renderId: "render-6a8b8d76",
      as: "div",
      children: [/* @__PURE__ */ jsx(Search, {
        size: 16,
        className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        value: search,
        onChange: (e) => setSearch(e.target.value),
        placeholder: "Search city or stadium…",
        className: "w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-600 transition-colors",
        renderId: "render-16c09b79",
        as: "input"
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex gap-2 mb-8 flex-wrap",
      renderId: "render-2b405ff3",
      as: "div",
      children: COUNTRIES$2.map((c) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        onClick: () => setCountry(c),
        className: `px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${country === c ? "bg-[#FF415B] text-white" : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"}`,
        renderId: "render-ef07dd1f",
        as: "button",
        children: c
      }, c))
    }), isLoading ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
      renderId: "render-c8eb6b3f",
      as: "div",
      children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-gray-900 border border-gray-800 rounded-2xl p-5 h-36 animate-pulse",
        renderId: "render-2aec0da8",
        as: "div"
      }, i))
    }) : Object.entries(grouped).map(([ctry, ctyCities]) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "mb-8",
      renderId: "render-47f09237",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-4",
        renderId: "render-1b8e0584",
        as: "h2",
        children: [ctyCities[0]?.flag, " ", ctry]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        renderId: "render-1eb58a33",
        as: "div",
        children: ctyCities.map((c) => /* @__PURE__ */ jsxs(Link, {
          to: `/cities/${c.id}`,
          className: "bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 flex flex-col gap-3 transition-colors group",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-start justify-between",
            renderId: "render-893fe4cc",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-d63b6b12",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "font-bold text-white group-hover:text-[#FF415B] transition-colors",
                renderId: "render-8898bea3",
                as: "p",
                children: c.name
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-1 mt-1",
                renderId: "render-2beb233f",
                as: "div",
                children: [/* @__PURE__ */ jsx(MapPin, {
                  size: 12,
                  className: "text-gray-500"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-xs text-gray-500 truncate",
                  renderId: "render-f9737841",
                  as: "p",
                  children: c.stadium
                })]
              })]
            }), /* @__PURE__ */ jsx(ChevronRight, {
              size: 16,
              className: "text-gray-600 group-hover:text-gray-400 mt-0.5 shrink-0"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center justify-between",
            renderId: "render-dcd89b46",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-xs text-[#FF415B] bg-[#FF415B]/10 px-2.5 py-1 rounded-full font-medium",
              renderId: "render-0689dd49",
              as: "span",
              children: [c.stadium_capacity?.toLocaleString(), " cap"]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-gray-600",
              renderId: "render-37402b88",
              as: "span",
              children: c.best_time_to_visit
            })]
          })]
        }, c.id))
      })]
    }, ctry))]
  });
}

const page$i = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Cities, {
      ...props
    })
  });
});

const route3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$i
}, Symbol.toStringTag, { value: 'Module' }));

const VENUE_ICONS = {
  Bar: Beer,
  Restaurant: UtensilsCrossed,
  "Fan Zone": Users,
  Attraction: Landmark
};
function CityDetail() {
  const {
    id
  } = useParams();
  const {
    data: city,
    isLoading
  } = useQuery({
    queryKey: ["city", id],
    queryFn: () => fetch(`/api/cities/${id}`).then((r) => r.json()),
    enabled: !!id
  });
  if (isLoading) return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "max-w-3xl mx-auto px-6 py-8 space-y-4",
    renderId: "render-e5f7c745",
    as: "div",
    children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-gray-900 rounded-2xl h-24 animate-pulse",
      renderId: "render-22ee177a",
      as: "div"
    }, i))
  });
  if (!city || city.error) return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "max-w-3xl mx-auto px-6 py-8 text-center text-gray-500",
    renderId: "render-1e8b0cbb",
    as: "div",
    children: "City not found."
  });
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "max-w-3xl mx-auto px-4 sm:px-6 py-8",
    renderId: "render-c56f432e",
    as: "div",
    children: [/* @__PURE__ */ jsxs(Link, {
      to: "/cities",
      className: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-6 transition-colors",
      children: [/* @__PURE__ */ jsx(ArrowLeft, {
        size: 16
      }), " Back to Cities"]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "bg-[#FF415B] rounded-2xl p-6 mb-6",
      renderId: "render-f48a6c8b",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "text-sm font-semibold text-white/70 mb-1",
        renderId: "render-0a396edd",
        as: "p",
        children: [city.flag, " ", city.country]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-3xl font-bold text-white mb-1",
        renderId: "render-131f4ad6",
        as: "h1",
        children: city.name
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-2 mt-3",
        renderId: "render-da458a49",
        as: "div",
        children: [/* @__PURE__ */ jsx(Users, {
          size: 15,
          className: "text-white/70"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-white/90 text-sm",
          renderId: "render-044c6b4c",
          as: "span",
          children: [city.stadium, " · ", city.stadium_capacity?.toLocaleString(), " capacity"]
        })]
      })]
    }), city.description && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "mb-6",
      renderId: "render-a947b935",
      as: "section",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-lg font-bold text-white mb-3",
        renderId: "render-61626aee",
        as: "h2",
        children: "About"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-gray-400 leading-relaxed",
        renderId: "render-b8aab450",
        as: "p",
        children: city.description
      })]
    }), city.transport_tips && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "mb-6",
      renderId: "render-da308580",
      as: "section",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-lg font-bold text-white mb-3",
        renderId: "render-ed7fb27c",
        as: "h2",
        children: "Getting There"
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-gray-900 border border-gray-800 rounded-2xl p-4 flex gap-3",
        renderId: "render-6deb0260",
        as: "div",
        children: [/* @__PURE__ */ jsx(Train, {
          size: 20,
          className: "text-[#FF415B] shrink-0 mt-0.5"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-gray-400 text-sm leading-relaxed",
          renderId: "render-b39f22b2",
          as: "p",
          children: city.transport_tips
        })]
      })]
    }), city.fan_zones?.length > 0 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "mb-6",
      renderId: "render-51f6b867",
      as: "section",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-lg font-bold text-white mb-3",
        renderId: "render-d5106723",
        as: "h2",
        children: "Fan Zones"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "space-y-3",
        renderId: "render-25e0fdda",
        as: "div",
        children: city.fan_zones.map((z, i) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-gray-900 border border-gray-800 rounded-xl p-4 flex gap-3",
          renderId: "render-19092049",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-8 h-8 rounded-lg bg-[#FF415B]/10 flex items-center justify-center shrink-0",
            renderId: "render-03b65414",
            as: "div",
            children: /* @__PURE__ */ jsx(Star, {
              size: 14,
              className: "text-[#FF415B]"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-8622d25b",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "font-semibold text-white text-sm",
              renderId: "render-2f79091e",
              as: "p",
              children: z.name
            }), z.address && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center gap-1 mt-0.5",
              renderId: "render-c1e961a1",
              as: "div",
              children: [/* @__PURE__ */ jsx(MapPin, {
                size: 11,
                className: "text-gray-500"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-gray-500",
                renderId: "render-93848b96",
                as: "p",
                children: z.address
              })]
            })]
          })]
        }, i))
      })]
    }), city.recommended_venues?.length > 0 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "mb-6",
      renderId: "render-e79d5e90",
      as: "section",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-lg font-bold text-white mb-3",
        renderId: "render-cf2d7d69",
        as: "h2",
        children: "Where to Go"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
        renderId: "render-c176f823",
        as: "div",
        children: city.recommended_venues.map((v, i) => {
          const Icon = VENUE_ICONS[v.type] || MapPin;
          return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-gray-900 border border-gray-800 rounded-xl p-4 flex gap-3",
            renderId: "render-84f27b83",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0",
              renderId: "render-e7b6687e",
              as: "div",
              children: /* @__PURE__ */ jsx(Icon, {
                size: 14,
                className: "text-gray-400"
              })
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "min-w-0",
              renderId: "render-2c6595cc",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-2",
                renderId: "render-e723bbf4",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "font-semibold text-white text-sm truncate",
                  renderId: "render-6d13462b",
                  as: "p",
                  children: v.name
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-[10px] text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded shrink-0",
                  renderId: "render-aa135ea6",
                  as: "span",
                  children: v.type
                })]
              }), v.address && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-gray-500 mt-0.5 truncate",
                renderId: "render-dbe372db",
                as: "p",
                children: v.address
              })]
            })]
          }, i);
        })
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      renderId: "render-821a1be8",
      as: "section",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-lg font-bold text-white mb-3",
        renderId: "render-c1a52c03",
        as: "h2",
        children: "Quick Facts"
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid grid-cols-2 gap-3",
        renderId: "render-736a1a32",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-gray-900 border border-gray-800 rounded-xl p-4",
          renderId: "render-9c78d705",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-gray-500 uppercase tracking-wider mb-1",
            renderId: "render-8f0f74ab",
            as: "p",
            children: "Best Time"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-semibold text-white",
            renderId: "render-f7010052",
            as: "p",
            children: city.best_time_to_visit || "June–July"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-gray-900 border border-gray-800 rounded-xl p-4",
          renderId: "render-690b3de2",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-gray-500 uppercase tracking-wider mb-1",
            renderId: "render-35d5f0af",
            as: "p",
            children: "Country"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "font-semibold text-white",
            renderId: "render-6ce0ed57",
            as: "p",
            children: [city.flag, " ", city.country]
          })]
        })]
      })]
    })]
  });
}

const page$h = UNSAFE_withComponentProps(function WrappedPage(props) {
  const params = useParams();
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(CityDetail, {
      ...props,
      id: params.id
    })
  });
});

const route4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$h
}, Symbol.toStringTag, { value: 'Module' }));

function Page$8() {
  useEffect(() => {
    const run = async () => {
      throw new Error("async effect exploded");
    };
    run();
  }, []);
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    renderId: "render-df296341",
    as: "div",
    children: "async effect error"
  });
}

const page$g = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Page$8, {
      ...props
    })
  });
});

const route5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$g
}, Symbol.toStringTag, { value: 'Module' }));

function Page$7() {
  const handleClick = () => {
    throw new Error("click handler exploded");
  };
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    onClick: handleClick,
    renderId: "render-88c09930",
    as: "button",
    children: "Click me"
  });
}

const page$f = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Page$7, {
      ...props
    })
  });
});

const route6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$f
}, Symbol.toStringTag, { value: 'Module' }));

function BadHook({
  flag
}) {
  if (flag) {
    const [n, setValue] = useState(0);
    return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      renderId: "render-e6fcb446",
      as: "div",
      children: [n, /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        onClick: () => setValue(n + 1),
        renderId: "render-441e9317",
        as: "button",
        children: "Increment"
      })]
    });
  }
  return "ok";
}
function Page$6() {
  const [count, setCount] = useState(0);
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    renderId: "render-36781a83",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      renderId: "render-89e49d7f",
      as: "h1",
      children: "Bad Hook Example"
    }), /* @__PURE__ */ jsx(BadHook, {
      flag: count % 2 === 0
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      onClick: () => setCount(count + 1),
      renderId: "render-8680f4c6",
      as: "button",
      children: "Toggle Hook"
    })]
  });
}

const page$e = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Page$6, {
      ...props
    })
  });
});

const route7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$e
}, Symbol.toStringTag, { value: 'Module' }));

function Page$5() {
  const [count, setCount] = useState(0);
  setCount(count + 1);
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    renderId: "render-b8a4ca39",
    as: "div",
    children: count
  });
}

const page$d = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Page$5, {
      ...props
    })
  });
});

const route8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$d
}, Symbol.toStringTag, { value: 'Module' }));

function Page$4() {
  const data = JSON.parse("not valid json {{{");
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    renderId: "render-c31bc586",
    as: "div",
    children: data.name
  });
}

const page$c = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Page$4, {
      ...props
    })
  });
});

const route9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$c
}, Symbol.toStringTag, { value: 'Module' }));

function Page$3() {
  const Widget = undefined;
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    renderId: "render-62cc9a1c",
    as: "div",
    children: Widget()
  });
}

const page$b = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Page$3, {
      ...props
    })
  });
});

const route10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$b
}, Symbol.toStringTag, { value: 'Module' }));

function Bug() {
  const obj = null;
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    renderId: "render-fb5ab023",
    as: "p",
    children: obj.key
  });
}

const page$a = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Bug, {
      ...props
    })
  });
});

const route11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$a
}, Symbol.toStringTag, { value: 'Module' }));

function Page$2() {
  const data = {
    name: "test",
    value: 42
  };
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    renderId: "render-dc32d594",
    as: "div",
    children: data
  });
}

const page$9 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Page$2, {
      ...props
    })
  });
});

const route12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$9
}, Symbol.toStringTag, { value: 'Module' }));

function Page$1() {
  const notAFunction = 42;
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    renderId: "render-56ec91bd",
    as: "p",
    children: notAFunction()
  });
}

const page$8 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Page$1, {
      ...props
    })
  });
});

const route13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$8
}, Symbol.toStringTag, { value: 'Module' }));

function Page() {
  const obj = void 0;
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    renderId: "render-1fb36621",
    as: "p",
    children: obj.key
  });
}

const page$7 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Page, {
      ...props
    })
  });
});

const route14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$7
}, Symbol.toStringTag, { value: 'Module' }));

function Fetcher() {
  useEffect(() => {
    fetch("/unknown");
  }, []);
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    renderId: "render-d23163a9",
    as: "div",
    children: "unhandled promise"
  });
}

const page$6 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Fetcher, {
      ...props
    })
  });
});

const route15 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$6
}, Symbol.toStringTag, { value: 'Module' }));

const EVENT_TYPES = ["Pre-Match Meetup", "Post-Match Celebration", "Watch Party", "City Tour", "Other"];
const BLANK$2 = {
  title: "",
  description: "",
  team: "",
  city: "",
  venue_name: "",
  address: "",
  date_time: "",
  organizer_name: "",
  type: "Pre-Match Meetup"
};
function Modal$2({
  onClose,
  onCreate
}) {
  const [form, setForm] = useState(BLANK$2);
  const set = (k) => (v) => setForm((f) => ({
    ...f,
    [k]: v
  }));
  const qc = useQueryClient();
  const create = useMutation({
    mutationFn: (d) => fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(d)
    }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["events"]
      });
      onClose();
    }
  });
  const submit = (e) => {
    e.preventDefault();
    if (!form.title || !form.city || !form.venue_name || !form.date_time) return;
    create.mutate(form);
  };
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4",
    renderId: "render-c06e7b4a",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto",
      renderId: "render-9526826c",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center justify-between p-5 border-b border-gray-800 sticky top-0 bg-gray-900",
        renderId: "render-ca1277d2",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "font-bold text-white text-lg",
          renderId: "render-244bac42",
          as: "h2",
          children: "Create Event"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: onClose,
          className: "text-gray-500 hover:text-white",
          renderId: "render-d135a4db",
          as: "button",
          children: /* @__PURE__ */ jsx(X, {
            size: 20
          })
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onSubmit: submit,
        className: "p-5 space-y-4",
        renderId: "render-28fd62f6",
        as: "form",
        children: [[["Title *", "title", "Pre-match meetup at the plaza"], ["City *", "city", "Mexico City"], ["Venue / Meeting point *", "venue_name", "Zócalo main entrance"], ["Date & Time *", "date_time", "2026-06-11 17:00"], ["Team (optional)", "team", "Brazil"], ["Address (optional)", "address", "Full address"], ["Organiser name (optional)", "organizer_name", "Your name"]].map(([label, key, ph]) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-e0608aaa",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-xs font-semibold text-gray-400 mb-1",
            renderId: "render-98fec02c",
            as: "label",
            children: label
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            value: form[key],
            onChange: (e) => set(key)(e.target.value),
            placeholder: ph,
            className: "w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-500 transition-colors",
            renderId: "render-d32d7519",
            as: "input"
          })]
        }, key)), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-37f051f9",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-xs font-semibold text-gray-400 mb-1",
            renderId: "render-cbced4b5",
            as: "label",
            children: "Description (optional)"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            value: form.description,
            onChange: (e) => set("description")(e.target.value),
            rows: 3,
            placeholder: "What's happening at this event?",
            className: "w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-500 resize-none",
            renderId: "render-b82056a5",
            as: "textarea"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-a7cea567",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-xs font-semibold text-gray-400 mb-2",
            renderId: "render-11e0c98f",
            as: "label",
            children: "Event Type"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex flex-wrap gap-2",
            renderId: "render-0627b989",
            as: "div",
            children: EVENT_TYPES.map((t) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "button",
              onClick: () => set("type")(t),
              className: `px-3 py-1 rounded-full text-xs font-medium transition-colors
                    ${form.type === t ? "bg-[#FF415B] text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`,
              renderId: "render-390e4ee5",
              as: "button",
              children: t
            }, t))
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          type: "submit",
          disabled: create.isPending,
          className: "w-full bg-[#FF415B] hover:bg-[#e03550] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50",
          renderId: "render-3b97d598",
          as: "button",
          children: create.isPending ? "Creating…" : "Create Event"
        })]
      })]
    })
  });
}
function Events() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  useQueryClient();
  const {
    data: events = [],
    isLoading
  } = useQuery({
    queryKey: ["events", search],
    queryFn: () => fetch(`/api/events${search ? `?search=${encodeURIComponent(search)}` : ""}`).then((r) => r.json()).catch(() => [])
  });
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "max-w-4xl mx-auto px-4 sm:px-6 py-8",
    renderId: "render-8b20fdc3",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex items-start justify-between mb-6",
      renderId: "render-210d12e5",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        renderId: "render-a91ac65f",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-3xl font-bold text-white",
          renderId: "render-b8a3ae8a",
          as: "h1",
          children: "Fan Events"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-gray-500 text-sm mt-1",
          renderId: "render-e9d6ad43",
          as: "p",
          children: "Meetups, watch parties & city tours"
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onClick: () => setShowModal(true),
        className: "flex items-center gap-2 bg-[#FF415B] hover:bg-[#e03550] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors",
        renderId: "render-99033615",
        as: "button",
        children: [/* @__PURE__ */ jsx(Plus, {
          size: 16
        }), " Create"]
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative mb-6",
      renderId: "render-66f325e6",
      as: "div",
      children: [/* @__PURE__ */ jsx(Search, {
        size: 16,
        className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        value: search,
        onChange: (e) => setSearch(e.target.value),
        placeholder: "Search events…",
        className: "w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-600 transition-colors",
        renderId: "render-2b37d01b",
        as: "input"
      })]
    }), isLoading ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "grid grid-cols-1 md:grid-cols-2 gap-4",
      renderId: "render-38243e66",
      as: "div",
      children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-gray-900 rounded-2xl h-40 animate-pulse border border-gray-800",
        renderId: "render-26fae7bb",
        as: "div"
      }, i))
    }) : events.length === 0 ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "text-center py-20",
      renderId: "render-664b2aad",
      as: "div",
      children: [/* @__PURE__ */ jsx(CalendarCheck, {
        size: 40,
        className: "mx-auto mb-3 text-gray-700"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-gray-500",
        renderId: "render-a1845a42",
        as: "p",
        children: "No events yet. Be the first to create one!"
      })]
    }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "grid grid-cols-1 md:grid-cols-2 gap-4",
      renderId: "render-faf17345",
      as: "div",
      children: events.map((e) => {
        const dt = (() => {
          try {
            return format(new Date(e.date_time), "EEE, MMM d · h:mm a");
          } catch {
            return e.date_time;
          }
        })();
        return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-gray-900 border border-gray-800 rounded-2xl p-5",
          renderId: "render-110f23e6",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-start justify-between mb-3",
            renderId: "render-b093cd61",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "min-w-0 flex-1",
              renderId: "render-2923a1f8",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "font-bold text-white",
                renderId: "render-a70f1c89",
                as: "p",
                children: e.title
              }), e.team && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-[#FF415B] bg-[#FF415B]/10 px-2 py-0.5 rounded-full mt-1 inline-block",
                renderId: "render-be7eb350",
                as: "span",
                children: e.team
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-lg shrink-0 ml-2",
              renderId: "render-89bc8015",
              as: "span",
              children: e.type
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-1.5 text-sm",
            renderId: "render-4e2562c7",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center gap-2 text-[#FF415B]",
              renderId: "render-d2087b03",
              as: "div",
              children: [/* @__PURE__ */ jsx(Clock, {
                size: 13
              }), " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "font-medium",
                renderId: "render-86300da2",
                as: "span",
                children: dt
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center gap-2 text-gray-400",
              renderId: "render-6b846eb9",
              as: "div",
              children: [/* @__PURE__ */ jsx(MapPin, {
                size: 13
              }), " ", /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "truncate",
                renderId: "render-8868508e",
                as: "span",
                children: [e.venue_name, e.city ? `, ${e.city}` : ""]
              })]
            })]
          }), e.description && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-gray-500 mt-3 line-clamp-2",
            renderId: "render-0354b256",
            as: "p",
            children: e.description
          }), e.organizer_name && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-800",
            renderId: "render-2cccebdc",
            as: "div",
            children: [/* @__PURE__ */ jsx(Users, {
              size: 12,
              className: "text-gray-600"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-xs text-gray-500",
              renderId: "render-70b0b8eb",
              as: "span",
              children: ["by ", e.organizer_name]
            })]
          })]
        }, e.id);
      })
    }), showModal && /* @__PURE__ */ jsx(Modal$2, {
      onClose: () => setShowModal(false)
    })]
  });
}

const page$5 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Events, {
      ...props
    })
  });
});

const route16 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$5
}, Symbol.toStringTag, { value: 'Module' }));

const TEAMS$1 = ["All", "Brazil", "Argentina", "France", "England", "Spain", "Germany", "Portugal", "Mexico", "USA", "Canada", "Netherlands", "Italy", "Morocco"];
const BLANK$1 = {
  team: "",
  title: "",
  content: "",
  author_name: ""
};
function Modal$1({
  onClose
}) {
  const [form, setForm] = useState(BLANK$1);
  const set = (k) => (v) => setForm((f) => ({
    ...f,
    [k]: v
  }));
  const qc = useQueryClient();
  const create = useMutation({
    mutationFn: (d) => fetch("/api/forums", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(d)
    }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["forums"]
      });
      onClose();
    }
  });
  const submit = (e) => {
    e.preventDefault();
    if (!form.team || !form.title || !form.content) return;
    create.mutate(form);
  };
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4",
    renderId: "render-027d746f",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto",
      renderId: "render-b4ea33af",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center justify-between p-5 border-b border-gray-800 sticky top-0 bg-gray-900",
        renderId: "render-9cec4613",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "font-bold text-white text-lg",
          renderId: "render-25559a0b",
          as: "h2",
          children: "New Post"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: onClose,
          className: "text-gray-500 hover:text-white",
          renderId: "render-7b72b6bf",
          as: "button",
          children: /* @__PURE__ */ jsx(X, {
            size: 20
          })
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onSubmit: submit,
        className: "p-5 space-y-4",
        renderId: "render-7362877f",
        as: "form",
        children: [[["Team *", "team", "e.g. Brazil"], ["Post Title *", "title", "What do you want to discuss?"], ["Your Name (optional)", "author_name", "Anonymous"]].map(([label, key, ph]) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-bc384002",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-xs font-semibold text-gray-400 mb-1",
            renderId: "render-df6b5a32",
            as: "label",
            children: label
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            value: form[key],
            onChange: (e) => set(key)(e.target.value),
            placeholder: ph,
            className: "w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-500 transition-colors",
            renderId: "render-b29d5bda",
            as: "input"
          })]
        }, key)), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-51a60342",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-xs font-semibold text-gray-400 mb-1",
            renderId: "render-fa84309a",
            as: "label",
            children: "Content *"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            value: form.content,
            onChange: (e) => set("content")(e.target.value),
            rows: 5,
            placeholder: "Share your thoughts, predictions, questions…",
            className: "w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-500 resize-none",
            renderId: "render-d4d98ce0",
            as: "textarea"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          type: "submit",
          disabled: create.isPending,
          className: "w-full bg-[#FF415B] hover:bg-[#e03550] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50",
          renderId: "render-fb1b366e",
          as: "button",
          children: create.isPending ? "Posting…" : "Post Discussion"
        })]
      })]
    })
  });
}
function Forums() {
  const [teamFilter, setTeamFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const qc = useQueryClient();
  const buildUrl = () => {
    const p = new URLSearchParams();
    if (teamFilter !== "All") p.set("team", teamFilter);
    if (search) p.set("search", search);
    return `/api/forums?${p}`;
  };
  const {
    data: posts = [],
    isLoading
  } = useQuery({
    queryKey: ["forums", teamFilter, search],
    queryFn: () => fetch(buildUrl()).then((r) => r.json()).catch(() => [])
  });
  const like = useMutation({
    mutationFn: (id) => fetch(`/api/forums/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "like"
      })
    }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["forums"]
    })
  });
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "max-w-4xl mx-auto px-4 sm:px-6 py-8",
    renderId: "render-0f220a2f",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex items-start justify-between mb-6",
      renderId: "render-cdce1cf9",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        renderId: "render-b753870b",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-3xl font-bold text-white",
          renderId: "render-20d0dc53",
          as: "h1",
          children: "Fan Forums"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-gray-500 text-sm mt-1",
          renderId: "render-c67c1a88",
          as: "p",
          children: "Talk football with fans worldwide"
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onClick: () => setShowModal(true),
        className: "flex items-center gap-2 bg-[#FF415B] hover:bg-[#e03550] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors",
        renderId: "render-c1037e9d",
        as: "button",
        children: [/* @__PURE__ */ jsx(Plus, {
          size: 16
        }), " Post"]
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative mb-4",
      renderId: "render-4528f69e",
      as: "div",
      children: [/* @__PURE__ */ jsx(Search, {
        size: 16,
        className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        value: search,
        onChange: (e) => setSearch(e.target.value),
        placeholder: "Search discussions…",
        className: "w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-600 transition-colors",
        renderId: "render-e5cfa9c3",
        as: "input"
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex gap-2 mb-6 flex-wrap",
      renderId: "render-2764c596",
      as: "div",
      children: TEAMS$1.map((t) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        onClick: () => setTeamFilter(t),
        className: `px-3 py-1.5 rounded-full text-xs font-medium transition-colors
              ${teamFilter === t ? "bg-[#FF415B] text-white" : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"}`,
        renderId: "render-9bcfab95",
        as: "button",
        children: t
      }, t))
    }), isLoading ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "space-y-4",
      renderId: "render-3382d105",
      as: "div",
      children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-gray-900 rounded-2xl h-32 animate-pulse border border-gray-800",
        renderId: "render-27191ccc",
        as: "div"
      }, i))
    }) : posts.length === 0 ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "text-center py-20",
      renderId: "render-6f2a7612",
      as: "div",
      children: [/* @__PURE__ */ jsx(MessageSquare, {
        size: 40,
        className: "mx-auto mb-3 text-gray-700"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-gray-500",
        renderId: "render-e6a201ff",
        as: "p",
        children: "No posts yet. Start the conversation!"
      })]
    }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "space-y-4",
      renderId: "render-785a1081",
      as: "div",
      children: posts.map((p) => {
        const ago = (() => {
          try {
            return formatDistanceToNow(new Date(p.created_date), {
              addSuffix: true
            });
          } catch {
            return "";
          }
        })();
        return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-gray-900 border border-gray-800 rounded-2xl p-5",
          renderId: "render-50b6eaa3",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center gap-2 mb-3",
            renderId: "render-19841f72",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs font-bold text-[#FF415B] bg-[#FF415B]/10 px-2.5 py-1 rounded-full",
              renderId: "render-fdcde19d",
              as: "span",
              children: p.team
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-gray-600 flex-1",
              renderId: "render-bdec4169",
              as: "span",
              children: ago
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-bold text-white mb-2",
            renderId: "render-1e9966b1",
            as: "h3",
            children: p.title
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-gray-400 text-sm leading-relaxed line-clamp-3",
            renderId: "render-e36cca64",
            as: "p",
            children: p.content
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center justify-between mt-4 pt-4 border-t border-gray-800",
            renderId: "render-70489cc3",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-gray-500",
              renderId: "render-def91d39",
              as: "span",
              children: p.author_name || "Anonymous"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center gap-4",
              renderId: "render-ba44085a",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                onClick: () => like.mutate(p.id),
                className: "flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#FF415B] transition-colors",
                renderId: "render-c627d8bd",
                as: "button",
                children: [/* @__PURE__ */ jsx(ThumbsUp, {
                  size: 13
                }), " ", p.likes ?? 0]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-1.5 text-xs text-gray-500",
                renderId: "render-41c962ac",
                as: "span",
                children: [/* @__PURE__ */ jsx(MessageSquare, {
                  size: 13
                }), " ", p.replies_count ?? 0]
              })]
            })]
          })]
        }, p.id);
      })
    }), showModal && /* @__PURE__ */ jsx(Modal$1, {
      onClose: () => setShowModal(false)
    })]
  });
}

const page$4 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Forums, {
      ...props
    })
  });
});

const route17 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$4
}, Symbol.toStringTag, { value: 'Module' }));

const RATES = {
  USD: 1,
  CAD: 1.37,
  MXN: 17.15
};
const CURRENCIES = [{
  code: "USD",
  name: "US Dollar",
  symbol: "$",
  flag: "🇺🇸"
}, {
  code: "CAD",
  name: "Canadian Dollar",
  symbol: "C$",
  flag: "🇨🇦"
}, {
  code: "MXN",
  name: "Mexican Peso",
  symbol: "MX$",
  flag: "🇲🇽"
}];
const VISA_INFO = {
  USA: [{
    h: "Visa Requirements",
    b: "Many nationalities enter under the Visa Waiver Program (ESTA). Apply at esta.cbp.dhs.gov before travelling. Those outside the VWP must apply for a B-2 tourist visa at a US Embassy."
  }, {
    h: "Required Documents",
    b: "Valid passport (6+ months), confirmed match tickets, proof of accommodation, return flight, and sufficient funds."
  }, {
    h: "Customs & Entry",
    b: "Complete customs declaration forms on arrival. Declare amounts over $10,000 USD. Prohibited: fresh produce, raw meat, certain medications."
  }, {
    h: "Emergency Contacts",
    b: "Emergency: 911 · US CBP: 1-877-227-5511"
  }],
  Canada: [{
    h: "Visa Requirements",
    b: "Many nationalities require an eTA (Electronic Travel Authorization). Apply at canada.ca/eta before travel. Others require a visitor visa from a Canadian embassy."
  }, {
    h: "Required Documents",
    b: "Valid passport, eTA confirmation, match tickets, hotel booking, return flight. Travel insurance is recommended."
  }, {
    h: "Customs & Entry",
    b: "Declare all food, plants and amounts over CAD $10,000. CBSA officers conduct checks at entry points."
  }, {
    h: "Emergency Contacts",
    b: "Emergency: 911 · CBSA: 1-800-461-9999 · Health info: 811"
  }],
  Mexico: [{
    h: "Visa Requirements",
    b: "Citizens of USA, Canada, EU, UK and many others can visit visa-free for up to 180 days. You'll receive an FMM tourist card at immigration — keep it for your entire stay."
  }, {
    h: "Required Documents",
    b: "Valid passport, FMM tourist card (do not lose it!), match tickets, accommodation proof, and return travel documents."
  }, {
    h: "Customs & Entry",
    b: "Declare amounts over $10,000 USD. Mexico uses a traffic light customs system — green = pass, red = inspection. Prohibited: fresh citrus, meat, certain medications."
  }, {
    h: "Emergency Contacts",
    b: "Emergency: 911 · Tourist assistance (SECTUR): 01800-006-8839 · Tourist police: 078"
  }]
};
const TABS = [{
  key: "currency",
  label: "Currency",
  icon: DollarSign
}, {
  key: "phrases",
  label: "Phrases",
  icon: Languages
}, {
  key: "visa",
  label: "Visa Info",
  icon: FileText
}];
function AccordionItem({
  item
}) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "bg-gray-900 border border-gray-800 rounded-xl overflow-hidden",
    renderId: "render-5eae05e5",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "w-full flex items-center justify-between p-4 text-left",
      onClick: () => setOpen((v) => !v),
      renderId: "render-b3114513",
      as: "button",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "font-semibold text-white text-sm",
        renderId: "render-f5ef32c2",
        as: "span",
        children: item.h
      }), open ? /* @__PURE__ */ jsx(ChevronUp, {
        size: 16,
        className: "text-gray-500 shrink-0"
      }) : /* @__PURE__ */ jsx(ChevronDown, {
        size: 16,
        className: "text-gray-500 shrink-0"
      })]
    }), open && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "px-4 pb-4 text-sm text-gray-400 leading-relaxed border-t border-gray-800 pt-3",
      renderId: "render-d0d21f53",
      as: "p",
      children: item.b
    })]
  });
}
function Logistics() {
  const [tab, setTab] = useState("currency");
  const [amount, setAmount] = useState("100");
  const [visaCtry, setVisaCtry] = useState("USA");
  const [phraseCategory, setPhraseCategory] = useState(null);
  const {
    data: phrasesData
  } = useQuery({
    queryKey: ["phrases", phraseCategory],
    queryFn: () => fetch(`/api/phrases${phraseCategory ? `?category=${phraseCategory}` : ""}`).then((r) => r.json()),
    enabled: tab === "phrases"
  });
  const convert = (rate) => {
    const n = parseFloat(amount);
    return isNaN(n) ? "—" : (n * rate).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "max-w-3xl mx-auto px-4 sm:px-6 py-8",
    renderId: "render-6bc433a8",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "text-3xl font-bold text-white mb-1",
      renderId: "render-68bd79b0",
      as: "h1",
      children: "Logistics"
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "text-gray-500 text-sm mb-6",
      renderId: "render-4b7f78e8",
      as: "p",
      children: "Everything you need to navigate the tournament countries"
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex gap-2 mb-8",
      renderId: "render-5466eff1",
      as: "div",
      children: TABS.map(({
        key,
        label,
        icon: Icon
      }) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onClick: () => setTab(key),
        className: `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border flex-1 justify-center
              ${tab === key ? "bg-[#FF415B] border-[#FF415B] text-white" : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"}`,
        renderId: "render-88187dc7",
        as: "button",
        children: [/* @__PURE__ */ jsx(Icon, {
          size: 15
        }), " ", label]
      }, key))
    }), tab === "currency" && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      renderId: "render-7c8a2e25",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-gray-400 text-sm mb-6",
        renderId: "render-b6e5a7f4",
        as: "p",
        children: "Quick currency reference. Enter a USD amount to convert."
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mb-6",
        renderId: "render-496acee5",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "block text-xs font-semibold text-gray-400 mb-2",
          renderId: "render-a1b9a38e",
          as: "label",
          children: "Amount in USD ($)"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          type: "number",
          value: amount,
          onChange: (e) => setAmount(e.target.value),
          className: "w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-2xl font-bold text-white focus:border-[#FF415B] transition-colors",
          renderId: "render-3dda50b2",
          as: "input"
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "space-y-3",
        renderId: "render-b358f916",
        as: "div",
        children: CURRENCIES.map((c) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4",
          renderId: "render-06429871",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-3xl",
            renderId: "render-caec54ca",
            as: "span",
            children: c.flag
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex-1",
            renderId: "render-8e977971",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "font-semibold text-white",
              renderId: "render-4ef52a06",
              as: "p",
              children: c.name
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-xs text-gray-500",
              renderId: "render-aad0cda9",
              as: "p",
              children: ["1 USD = ", RATES[c.code], " ", c.code]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-2xl font-bold text-white tabular-nums",
            renderId: "render-c37ac645",
            as: "p",
            children: [c.symbol, convert(RATES[c.code])]
          })]
        }, c.code))
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-xs text-gray-600 text-center mt-4",
        renderId: "render-319752fb",
        as: "p",
        children: "Rates are approximate. Check your bank for exact rates."
      })]
    }), tab === "phrases" && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      renderId: "render-a2f96e90",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-gray-400 text-sm mb-4",
        renderId: "render-4782c9fc",
        as: "p",
        children: "Essential phrases in English, Spanish (🇲🇽🇺🇸) and French (🇨🇦)."
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-2 mb-6",
        renderId: "render-e9e70299",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setPhraseCategory(null),
          className: `px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                ${!phraseCategory ? "bg-[#FF415B] text-white" : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"}`,
          renderId: "render-4d4faa27",
          as: "button",
          children: "All"
        }), (phrasesData?.categories || []).map((cat) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setPhraseCategory(cat),
          className: `px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                  ${phraseCategory === cat ? "bg-[#FF415B] text-white" : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"}`,
          renderId: "render-e2d2392f",
          as: "button",
          children: cat
        }, cat))]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "space-y-3",
        renderId: "render-691379c2",
        as: "div",
        children: (phrasesData?.phrases || []).map((p) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-gray-900 border border-gray-800 rounded-2xl p-4",
          renderId: "render-0abf2c66",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex items-center gap-2 mb-2",
            renderId: "render-f5c3cb09",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded",
              renderId: "render-d1e0a6d2",
              as: "span",
              children: p.category
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "font-bold text-white mb-3",
            renderId: "render-7a18fcb0",
            as: "p",
            children: p.english
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "grid grid-cols-2 gap-3",
            renderId: "render-e60c1dcf",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-a0613bee",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-gray-500 mb-0.5",
                renderId: "render-30abf7cd",
                as: "p",
                children: "🇲🇽 Spanish"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm text-gray-300",
                renderId: "render-0674acf0",
                as: "p",
                children: p.spanish
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-7c1783f0",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-gray-500 mb-0.5",
                renderId: "render-bdfca50e",
                as: "p",
                children: "🇨🇦 French"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm text-gray-300",
                renderId: "render-c8b35123",
                as: "p",
                children: p.french
              })]
            })]
          })]
        }, p.id))
      })]
    }), tab === "visa" && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      renderId: "render-26814690",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-gray-400 text-sm mb-6",
        renderId: "render-f0a2990b",
        as: "p",
        children: "Entry requirements for each host country. Always verify with official government sources before travel."
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex gap-2 mb-6",
        renderId: "render-a78c7c23",
        as: "div",
        children: ["USA", "Canada", "Mexico"].map((c) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => setVisaCtry(c),
          className: `flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors border
                  ${visaCtry === c ? "bg-[#FF415B] border-[#FF415B] text-white" : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"}`,
          renderId: "render-bc571d0c",
          as: "button",
          children: c
        }, c))
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "space-y-3",
        renderId: "render-24ebdbba",
        as: "div",
        children: VISA_INFO[visaCtry].map((item, i) => /* @__PURE__ */ jsx(AccordionItem, {
          item
        }, i))
      })]
    })]
  });
}

const page$3 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Logistics, {
      ...props
    })
  });
});

const route18 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$3
}, Symbol.toStringTag, { value: 'Module' }));

const STAGES = ["Group Stage", "Round of 32", "Round of 16", "Quarter Final", "Semi Final", "Final"];
const COUNTRIES$1 = ["USA", "Canada", "Mexico"];
const BLANK = {
  team1: "",
  team2: "",
  date: "",
  venue: "",
  city: "",
  country: "USA",
  stage: "Group Stage",
  notes: ""
};
const getUserId = () => {
  let id = localStorage.getItem("fanpass_user_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("fanpass_user_id", id);
  }
  return id;
};
function Modal({
  match,
  onClose
}) {
  const [form, setForm] = useState(match ? {
    team1: match.team1,
    team2: match.team2,
    date: match.date,
    venue: match.venue,
    city: match.city,
    country: match.country,
    stage: match.stage,
    notes: match.notes || ""
  } : BLANK);
  const set = (k) => (v) => setForm((f) => ({
    ...f,
    [k]: v
  }));
  const qc = useQueryClient();
  const save = useMutation({
    mutationFn: (d) => {
      const userId = getUserId();
      const body = {
        ...d,
        userId
      };
      if (match) body.id = match.id;
      return fetch("/api/my-matches", {
        method: match ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }).then((r) => r.json());
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["myMatches"]
      });
      onClose();
    }
  });
  const submit = (e) => {
    e.preventDefault();
    if (!form.team1 || !form.team2 || !form.date || !form.venue || !form.city) return;
    save.mutate(form);
  };
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4",
    renderId: "render-b06f3dae",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto",
      renderId: "render-98a08f1b",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center justify-between p-5 border-b border-gray-800 sticky top-0 bg-gray-900",
        renderId: "render-269fa323",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "font-bold text-white text-lg",
          renderId: "render-02a7e167",
          as: "h2",
          children: match ? "Edit Match" : "Add Match"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: onClose,
          className: "text-gray-500 hover:text-white",
          renderId: "render-bdfe7628",
          as: "button",
          children: /* @__PURE__ */ jsx(X, {
            size: 20
          })
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onSubmit: submit,
        className: "p-5 space-y-4",
        renderId: "render-689ca2b7",
        as: "form",
        children: [[["Team 1 *", "team1", "e.g. Brazil"], ["Team 2 *", "team2", "e.g. Argentina"], ["Date & Time *", "date", "2026-06-14 18:00"], ["Stadium / Venue *", "venue", "e.g. Estadio Azteca"], ["City *", "city", "e.g. Mexico City"]].map(([label, key, ph]) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-a2312e8e",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-xs font-semibold text-gray-400 mb-1",
            renderId: "render-026de679",
            as: "label",
            children: label
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            value: form[key],
            onChange: (e) => set(key)(e.target.value),
            placeholder: ph,
            className: "w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-500 transition-colors",
            renderId: "render-d374213c",
            as: "input"
          })]
        }, key)), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-9148666a",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-xs font-semibold text-gray-400 mb-2",
            renderId: "render-c2df3650",
            as: "label",
            children: "Country *"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex gap-2",
            renderId: "render-927d815a",
            as: "div",
            children: COUNTRIES$1.map((c) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "button",
              onClick: () => set("country")(c),
              className: `flex-1 py-2 rounded-xl text-sm font-medium transition-colors border
                    ${form.country === c ? "bg-[#FF415B] border-[#FF415B] text-white" : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"}`,
              renderId: "render-c8620cf2",
              as: "button",
              children: c
            }, c))
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-d42d00fd",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-xs font-semibold text-gray-400 mb-2",
            renderId: "render-ca3068bd",
            as: "label",
            children: "Stage"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex flex-wrap gap-2",
            renderId: "render-8db8c11f",
            as: "div",
            children: STAGES.map((s) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "button",
              onClick: () => set("stage")(s),
              className: `px-3 py-1 rounded-full text-xs font-medium transition-colors
                    ${form.stage === s ? "bg-[#FF415B] text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`,
              renderId: "render-1d65f86e",
              as: "button",
              children: s
            }, s))
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-936da880",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "block text-xs font-semibold text-gray-400 mb-1",
            renderId: "render-33bd6041",
            as: "label",
            children: "Notes (optional)"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            value: form.notes,
            onChange: (e) => set("notes")(e.target.value),
            rows: 2,
            placeholder: "Seat number, travel notes…",
            className: "w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-500 resize-none",
            renderId: "render-ca0d008d",
            as: "textarea"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          type: "submit",
          disabled: save.isPending,
          className: "w-full bg-[#FF415B] hover:bg-[#e03550] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50",
          renderId: "render-25abdd1f",
          as: "button",
          children: save.isPending ? "Saving…" : match ? "Save Changes" : "Add Match"
        })]
      })]
    })
  });
}
function MyMatches() {
  const [modal, setModal] = useState(null);
  const qc = useQueryClient();
  const {
    data: matches = [],
    isLoading
  } = useQuery({
    queryKey: ["myMatches"],
    queryFn: () => {
      const userId = getUserId();
      return fetch(`/api/my-matches?userId=${userId}`).then((r) => r.json()).catch(() => []);
    }
  });
  const del = useMutation({
    mutationFn: (id) => fetch(`/api/my-matches?id=${id}&userId=${getUserId()}`, {
      method: "DELETE"
    }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["myMatches"]
    })
  });
  const grouped = matches.reduce((acc, m) => {
    if (!acc[m.city]) acc[m.city] = [];
    acc[m.city].push(m);
    return acc;
  }, {});
  const stats = {
    total: matches.length,
    cities: new Set(matches.map((m) => m.city)).size,
    countries: new Set(matches.map((m) => m.country)).size
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "max-w-4xl mx-auto px-4 sm:px-6 py-8",
    renderId: "render-0d482e57",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex items-start justify-between mb-6",
      renderId: "render-1cf06e0f",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        renderId: "render-40d914a7",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-3xl font-bold text-white",
          renderId: "render-f2d351f6",
          as: "h1",
          children: "My Matches"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-gray-500 text-sm mt-1",
          renderId: "render-892774dc",
          as: "p",
          children: "Your personal match bookings"
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onClick: () => setModal("new"),
        className: "flex items-center gap-2 bg-[#FF415B] hover:bg-[#e03550] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors",
        renderId: "render-65e5d9db",
        as: "button",
        children: [/* @__PURE__ */ jsx(Plus, {
          size: 16
        }), " Add"]
      })]
    }), matches.length > 0 && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "grid grid-cols-3 gap-4 mb-8",
      renderId: "render-5c09fe5c",
      as: "div",
      children: [["Matches", stats.total], ["Cities", stats.cities], ["Countries", stats.countries]].map(([l, v]) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center",
        renderId: "render-3e7270c0",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-2xl font-bold text-[#FF415B]",
          renderId: "render-12eb226e",
          as: "div",
          children: v
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-xs text-gray-500 mt-0.5",
          renderId: "render-962051d0",
          as: "div",
          children: l
        })]
      }, l))
    }), isLoading ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "space-y-3",
      renderId: "render-1d84f7a3",
      as: "div",
      children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-gray-900 rounded-2xl h-28 animate-pulse border border-gray-800",
        renderId: "render-dc3ac528",
        as: "div"
      }, i))
    }) : matches.length === 0 ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "text-center py-20",
      renderId: "render-02df5455",
      as: "div",
      children: [/* @__PURE__ */ jsx(Calendar, {
        size: 40,
        className: "mx-auto mb-3 text-gray-700"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-gray-500",
        renderId: "render-330bab65",
        as: "p",
        children: "No matches booked yet. Tap + Add to get started."
      })]
    }) : Object.entries(grouped).map(([city, cityMatches]) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "mb-8",
      renderId: "render-c5c142d9",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-3",
        renderId: "render-7880e31e",
        as: "h2",
        children: city
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "space-y-3",
        renderId: "render-299e40c2",
        as: "div",
        children: cityMatches.map((m) => {
          const dt = (() => {
            try {
              return format(new Date(m.date), "EEE, MMM d yyyy · h:mm a");
            } catch {
              return m.date;
            }
          })();
          return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-gray-900 border border-gray-800 rounded-2xl p-5",
            renderId: "render-22a23582",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-start justify-between mb-3",
              renderId: "render-731e6944",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-f53c26f6",
                as: "div",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "font-bold text-white",
                  renderId: "render-acc6a7b9",
                  as: "p",
                  children: [m.team1, " vs ", m.team2]
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-xs text-[#FF415B] bg-[#FF415B]/10 px-2 py-0.5 rounded-full mt-1 inline-block",
                  renderId: "render-cc6dce66",
                  as: "span",
                  children: m.stage
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex gap-2",
                renderId: "render-f02a5d1e",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  onClick: () => setModal(m),
                  className: "text-gray-500 hover:text-white text-xs px-2 py-1 bg-gray-800 rounded-lg transition-colors",
                  renderId: "render-a8f717b8",
                  as: "button",
                  children: "Edit"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  onClick: () => del.mutate(m.id),
                  className: "text-[#FF415B] hover:bg-[#FF415B]/10 p-1.5 rounded-lg transition-colors",
                  renderId: "render-05432eb0",
                  as: "button",
                  children: /* @__PURE__ */ jsx(Trash2, {
                    size: 14
                  })
                })]
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "space-y-1 text-sm text-gray-400",
              renderId: "render-f915962b",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-2",
                renderId: "render-1f103331",
                as: "div",
                children: [/* @__PURE__ */ jsx(Calendar, {
                  size: 13
                }), " ", dt]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-2",
                renderId: "render-18f36718",
                as: "div",
                children: [/* @__PURE__ */ jsx(MapPin, {
                  size: 13
                }), " ", m.venue]
              })]
            }), m.notes && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-gray-500 italic mt-2",
              renderId: "render-9f8aea58",
              as: "p",
              children: m.notes
            })]
          }, m.id);
        })
      })]
    }, city)), modal && /* @__PURE__ */ jsx(Modal, {
      match: modal === "new" ? null : modal,
      onClose: () => setModal(null)
    })]
  });
}

const page$2 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(MyMatches, {
      ...props
    })
  });
});

const route19 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$2
}, Symbol.toStringTag, { value: 'Module' }));

const COUNTRIES = [{
  name: "Germany",
  flag: "🇩🇪"
}, {
  name: "Brazil",
  flag: "🇧🇷"
}, {
  name: "England",
  flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
}, {
  name: "Spain",
  flag: "🇪🇸"
}, {
  name: "France",
  flag: "🇫🇷"
}, {
  name: "Italy",
  flag: "🇮🇹"
}, {
  name: "Argentina",
  flag: "🇦🇷"
}, {
  name: "Portugal",
  flag: "🇵🇹"
}, {
  name: "Netherlands",
  flag: "🇳🇱"
}, {
  name: "Belgium",
  flag: "🇧🇪"
}, {
  name: "Japan",
  flag: "🇯🇵"
}, {
  name: "South Korea",
  flag: "🇰🇷"
}, {
  name: "United States",
  flag: "🇺🇸"
}, {
  name: "Mexico",
  flag: "🇲🇽"
}, {
  name: "Croatia",
  flag: "🇭🇷"
}, {
  name: "Uruguay",
  flag: "🇺🇾"
}, {
  name: "Morocco",
  flag: "🇲🇦"
}, {
  name: "Senegal",
  flag: "🇸🇳"
}, {
  name: "Australia",
  flag: "🇦🇺"
}, {
  name: "Canada",
  flag: "🇨🇦"
}, {
  name: "Ecuador",
  flag: "🇪🇨"
}, {
  name: "USA",
  flag: "🇺🇸"
}, {
  name: "Switzerland",
  flag: "🇨🇭"
}, {
  name: "Norway",
  flag: "🇳🇴"
}, {
  name: "Austria",
  flag: "🇦🇹"
}, {
  name: "Colombia",
  flag: "🇨🇴"
}, {
  name: "Tunisia",
  flag: "🇹🇳"
}, {
  name: "Ghana",
  flag: "🇬🇭"
}, {
  name: "Sweden",
  flag: "🇸🇪"
}, {
  name: "Scotland",
  flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿"
}, {
  name: "Algeria",
  flag: "🇩🇿"
}, {
  name: "Saudi Arabia",
  flag: "🇸🇦"
}];
const TEAMS = [{
  name: "Argentina",
  flag: "🇦🇷"
}, {
  name: "Brazil",
  flag: "🇧🇷"
}, {
  name: "France",
  flag: "🇫🇷"
}, {
  name: "England",
  flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
}, {
  name: "Spain",
  flag: "🇪🇸"
}, {
  name: "Germany",
  flag: "🇩🇪"
}, {
  name: "Portugal",
  flag: "🇵🇹"
}, {
  name: "Netherlands",
  flag: "🇳🇱"
}, {
  name: "Mexico",
  flag: "🇲🇽"
}, {
  name: "USA",
  flag: "🇺🇸"
}, {
  name: "Canada",
  flag: "🇨🇦"
}, {
  name: "Japan",
  flag: "🇯🇵"
}, {
  name: "Morocco",
  flag: "🇲🇦"
}, {
  name: "South Korea",
  flag: "🇰🇷"
}, {
  name: "Belgium",
  flag: "🇧🇪"
}, {
  name: "Uruguay",
  flag: "🇺🇾"
}, {
  name: "Croatia",
  flag: "🇭🇷"
}, {
  name: "Switzerland",
  flag: "🇨🇭"
}, {
  name: "Colombia",
  flag: "🇨🇴"
}, {
  name: "Senegal",
  flag: "🇸🇳"
}, {
  name: "Norway",
  flag: "🇳🇴"
}, {
  name: "Austria",
  flag: "🇦🇹"
}, {
  name: "Australia",
  flag: "🇦🇺"
}, {
  name: "Ecuador",
  flag: "🇪🇨"
}, {
  name: "Scotland",
  flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿"
}, {
  name: "Ghana",
  flag: "🇬🇭"
}, {
  name: "Sweden",
  flag: "🇸🇪"
}, {
  name: "Algeria",
  flag: "🇩🇿"
}, {
  name: "Tunisia",
  flag: "🇹🇳"
}, {
  name: "Saudi Arabia",
  flag: "🇸🇦"
}, {
  name: "Italy",
  flag: "🇮🇹"
}, {
  name: "Turkey",
  flag: "🇹🇷"
}];
const LANGUAGES = [{
  code: "en",
  label: "English"
}, {
  code: "es",
  label: "Español"
}, {
  code: "fr",
  label: "Français"
}, {
  code: "pt",
  label: "Português"
}, {
  code: "de",
  label: "Deutsch"
}];
function SelectGrid({
  items,
  value,
  onSelect,
  searchable = false
}) {
  const [search, setSearch] = useState("");
  const filtered = search ? items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase())) : items;
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    renderId: "render-c7caff15",
    as: "div",
    children: [searchable && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative mb-3",
      renderId: "render-530a66aa",
      as: "div",
      children: [/* @__PURE__ */ jsx(Search, {
        size: 14,
        className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        value: search,
        onChange: (e) => setSearch(e.target.value),
        placeholder: "Search…",
        className: "w-full bg-gray-800 border border-gray-700 rounded-xl pl-8 pr-3 py-2 text-sm text-white placeholder-gray-600 focus:border-gray-500 transition-colors",
        renderId: "render-97d6a8a8",
        as: "input"
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-72 overflow-y-auto pr-1",
      renderId: "render-5f5b5163",
      as: "div",
      children: filtered.map((item) => {
        const selected = value === item.name;
        return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          onClick: () => onSelect(item),
          className: `flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-left transition-colors border
                ${selected ? "bg-[#FF415B]/15 border-[#FF415B]/40 text-white" : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"}`,
          renderId: "render-fb235bdd",
          as: "button",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg shrink-0",
            renderId: "render-4826374d",
            as: "span",
            children: item.flag
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "truncate font-medium",
            renderId: "render-de08e02a",
            as: "span",
            children: item.name
          }), selected && /* @__PURE__ */ jsx(Check, {
            size: 14,
            className: "text-[#FF415B] ml-auto shrink-0"
          })]
        }, item.name);
      })
    })]
  });
}
function Profile() {
  const {
    prefs,
    save,
    clear,
    hasPrefs
  } = usePreferences();
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "max-w-3xl mx-auto px-4 sm:px-6 py-8",
    renderId: "render-71c21e4e",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex items-start justify-between mb-8",
      renderId: "render-1f266852",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        renderId: "render-375a2d98",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-3xl font-bold text-white",
          renderId: "render-a4dac598",
          as: "h1",
          children: "Profile"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-gray-500 text-sm mt-1",
          renderId: "render-d83888b3",
          as: "p",
          children: "Set your country and favourite team to personalise FanPass"
        })]
      }), hasPrefs && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3",
        renderId: "render-0f0ca9e8",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-2xl",
          renderId: "render-24b8bc57",
          as: "span",
          children: prefs.countryFlag
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-aafecac7",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-white",
            renderId: "render-6caa8749",
            as: "p",
            children: prefs.country
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-xs text-gray-500",
            renderId: "render-d70b6975",
            as: "p",
            children: ["Supporting ", prefs.team]
          })]
        })]
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "space-y-8",
      renderId: "render-93611e29",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-gray-900 border border-gray-800 rounded-2xl p-6",
        renderId: "render-37fb362b",
        as: "section",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-3 mb-5",
          renderId: "render-939711d9",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-9 h-9 rounded-xl bg-[#FF415B]/10 flex items-center justify-center",
            renderId: "render-05448962",
            as: "div",
            children: /* @__PURE__ */ jsx(Globe, {
              size: 18,
              className: "text-[#FF415B]"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-5c9ec524",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "font-bold text-white",
              renderId: "render-ff60d883",
              as: "h2",
              children: "Your Country"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-gray-500",
              renderId: "render-db4c2a99",
              as: "p",
              children: "Where are you from?"
            })]
          }), prefs.country && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "ml-auto text-sm font-semibold text-[#FF415B]",
            renderId: "render-fbae2d53",
            as: "span",
            children: [prefs.countryFlag, " ", prefs.country]
          })]
        }), /* @__PURE__ */ jsx(SelectGrid, {
          items: COUNTRIES,
          value: prefs.country,
          searchable: true,
          onSelect: (c) => save({
            country: c.name,
            countryFlag: c.flag
          })
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-gray-900 border border-gray-800 rounded-2xl p-6",
        renderId: "render-2cf738f0",
        as: "section",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-3 mb-5",
          renderId: "render-01ad9b9f",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-9 h-9 rounded-xl bg-[#FF415B]/10 flex items-center justify-center",
            renderId: "render-7c083489",
            as: "div",
            children: /* @__PURE__ */ jsx(Trophy, {
              size: 18,
              className: "text-[#FF415B]"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-c7713003",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "font-bold text-white",
              renderId: "render-25c47cf6",
              as: "h2",
              children: "Favourite Team"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-gray-500",
              renderId: "render-101b97e0",
              as: "p",
              children: "Which team are you supporting?"
            })]
          }), prefs.team && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "ml-auto text-sm font-semibold text-[#FF415B]",
            renderId: "render-ea014a32",
            as: "span",
            children: [TEAMS.find((t) => t.name === prefs.team)?.flag, " ", prefs.team]
          })]
        }), /* @__PURE__ */ jsx(SelectGrid, {
          items: TEAMS,
          value: prefs.team,
          searchable: true,
          onSelect: (t) => save({
            team: t.name
          })
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-gray-900 border border-gray-800 rounded-2xl p-6",
        renderId: "render-e3cde597",
        as: "section",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-3 mb-5",
          renderId: "render-165fd3d9",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-9 h-9 rounded-xl bg-[#FF415B]/10 flex items-center justify-center",
            renderId: "render-1321a211",
            as: "div",
            children: /* @__PURE__ */ jsx(Languages, {
              size: 18,
              className: "text-[#FF415B]"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-78fd1f91",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "font-bold text-white",
              renderId: "render-dd594631",
              as: "h2",
              children: "Language"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-gray-500",
              renderId: "render-bf9d7245",
              as: "p",
              children: "Preferred display language"
            })]
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex flex-wrap gap-2",
          renderId: "render-cd42eb54",
          as: "div",
          children: LANGUAGES.map((lang) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => save({
              language: lang.code
            }),
            className: `px-4 py-2 rounded-xl text-sm font-medium transition-colors border
                  ${prefs.language === lang.code ? "bg-[#FF415B] border-[#FF415B] text-white" : "bg-gray-800 border-gray-700 text-gray-300 hover:text-white"}`,
            renderId: "render-50205e83",
            as: "button",
            children: lang.label
          }, lang.code))
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-3",
        renderId: "render-356a7e6f",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: handleSave,
          className: "flex-1 bg-[#FF415B] hover:bg-[#e03550] text-white font-semibold py-3 rounded-xl transition-colors",
          renderId: "render-2fd12580",
          as: "button",
          children: saved ? "✓ Saved!" : "Save Preferences"
        }), hasPrefs && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: clear,
          className: "px-5 py-3 bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white font-medium rounded-xl text-sm transition-colors",
          renderId: "render-d8c9292c",
          as: "button",
          children: "Reset"
        })]
      })]
    })]
  });
}

const page$1 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Profile, {
      ...props
    })
  });
});

const route20 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$1
}, Symbol.toStringTag, { value: 'Module' }));

const FILTERS = ["All", "Live", "Today", "Upcoming", "Results"];
const LIVE_STATUSES = /* @__PURE__ */ new Set(["first-half", "second-half", "half-time"]);
function statusLabel(m) {
  if (m.status === "first-half") return `${m.match_minute ?? 0}'`;
  if (m.status === "second-half") return `${m.match_minute ?? 45}'`;
  if (m.status === "half-time") return "HT";
  if (m.status === "finished") return "FT";
  if (m.status === "pre-match") return "Soon";
  try {
    return new Date(m.match_date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return "";
  }
}
function MatchCard({
  m
}) {
  const isLive = LIVE_STATUSES.has(m.status);
  const isFinished = m.status === "finished";
  const isUpcoming = m.status === "upcoming" || m.status === "pre-match";
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: `bg-gray-900 rounded-2xl p-4 border transition-colors
      ${isLive ? "border-[#FF415B]/40" : "border-gray-800"}`,
    renderId: "render-8a2d7500",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex items-center justify-between mb-3",
      renderId: "render-f0b1cf2f",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-xs font-semibold text-gray-500 uppercase tracking-wider",
        renderId: "render-773743b6",
        as: "span",
        children: m.tournament
      }), isLive ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-1.5 text-xs font-bold text-[#FF415B] bg-[#FF415B]/10 px-2 py-0.5 rounded-full",
        renderId: "render-c598143f",
        as: "span",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-1.5 h-1.5 rounded-full bg-[#FF415B] live-pulse",
          renderId: "render-dcd0f29b",
          as: "span"
        }), statusLabel(m)]
      }) : isFinished ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-1 text-xs text-gray-500",
        renderId: "render-7a3cf363",
        as: "span",
        children: [/* @__PURE__ */ jsx(CheckCircle2, {
          size: 12
        }), " FT"]
      }) : /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-1 text-xs text-gray-500",
        renderId: "render-ff0a2597",
        as: "span",
        children: [/* @__PURE__ */ jsx(Clock, {
          size: 12
        }), " ", statusLabel(m)]
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex items-center gap-2",
      renderId: "render-fb609211",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex-1 flex items-center gap-2 min-w-0",
        renderId: "render-887dee19",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-2xl",
          renderId: "render-5e35f746",
          as: "span",
          children: m.team1_flag
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-sm font-semibold text-white truncate",
          renderId: "render-ea471e62",
          as: "span",
          children: m.team1
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: `px-3 py-1.5 rounded-xl min-w-[72px] text-center
          ${isLive ? "bg-[#FF415B]/15" : "bg-gray-800"}`,
        renderId: "render-674be40f",
        as: "div",
        children: isUpcoming ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-gray-500 font-bold text-sm",
          renderId: "render-f633c5d8",
          as: "span",
          children: "vs"
        }) : /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: `text-lg font-bold tabular-nums ${isLive ? "text-[#FF415B]" : "text-white"}`,
          renderId: "render-18fef636",
          as: "span",
          children: [m.team1_score ?? 0, " – ", m.team2_score ?? 0]
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex-1 flex items-center gap-2 justify-end min-w-0",
        renderId: "render-aad5fca1",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-sm font-semibold text-white truncate text-right",
          renderId: "render-de871cab",
          as: "span",
          children: m.team2
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-2xl",
          renderId: "render-09bf1ab0",
          as: "span",
          children: m.team2_flag
        })]
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "text-center text-xs text-gray-600 mt-2 truncate",
      renderId: "render-27bf4b90",
      as: "p",
      children: [m.venue, " · ", m.location]
    })]
  });
}
function Schedule() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const buildUrl = () => {
    if (filter === "Live") return "/api/live-scores?status=live";
    if (filter === "Today") return `/api/live-scores?date=${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`;
    if (filter === "Upcoming") return "/api/live-scores?status=upcoming";
    if (filter === "Results") return "/api/live-scores?status=finished";
    return "/api/live-scores";
  };
  const {
    data: matches = [],
    dataUpdatedAt
  } = useQuery({
    queryKey: ["schedule", filter],
    queryFn: () => fetch(buildUrl()).then((r) => r.json()).catch(() => []),
    refetchInterval: 3e4
  });
  const liveCount = matches.filter((m) => LIVE_STATUSES.has(m.status)).length;
  const filtered = search ? matches.filter((m) => m.team1.toLowerCase().includes(search.toLowerCase()) || m.team2.toLowerCase().includes(search.toLowerCase()) || m.venue?.toLowerCase().includes(search.toLowerCase()) || m.tournament?.toLowerCase().includes(search.toLowerCase())) : matches;
  const grouped = filtered.reduce((acc, m) => {
    const d = m.match_date.slice(0, 10);
    if (!acc[d]) acc[d] = [];
    acc[d].push(m);
    return acc;
  }, {});
  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }) : "—";
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "max-w-4xl mx-auto px-4 sm:px-6 py-8",
    renderId: "render-778dc662",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex items-start justify-between mb-6",
      renderId: "render-9f4d75e3",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        renderId: "render-cd3b7b24",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-3xl font-bold text-white",
          renderId: "render-9b2d798f",
          as: "h1",
          children: "Scores & Fixtures"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-gray-500 text-sm mt-1",
          renderId: "render-66d36af7",
          as: "p",
          children: ["Updated ", lastUpdated, " · auto-refreshes every 30s"]
        })]
      }), liveCount > 0 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-2 bg-[#FF415B]/10 border border-[#FF415B]/30 text-[#FF415B] text-sm font-bold px-3 py-1.5 rounded-full",
        renderId: "render-9496bfe2",
        as: "span",
        children: [/* @__PURE__ */ jsx(Radio, {
          size: 14,
          className: "live-pulse"
        }), " ", liveCount, " LIVE"]
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative mb-4",
      renderId: "render-ffbe2bf9",
      as: "div",
      children: [/* @__PURE__ */ jsx(Search, {
        size: 16,
        className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        value: search,
        onChange: (e) => setSearch(e.target.value),
        placeholder: "Search team, venue or stage…",
        className: "w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-600 transition-colors",
        renderId: "render-d0f94c4f",
        as: "input"
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex gap-2 mb-6 flex-wrap",
      renderId: "render-9a67b89a",
      as: "div",
      children: FILTERS.map((f) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        onClick: () => setFilter(f),
        className: `px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${filter === f ? "bg-[#FF415B] text-white" : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"}`,
        renderId: "render-9e882d6e",
        as: "button",
        children: f
      }, f))
    }), Object.keys(grouped).length === 0 ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "text-center py-20 text-gray-600",
      renderId: "render-5d2e1ee6",
      as: "div",
      children: [/* @__PURE__ */ jsx(Calendar, {
        size: 40,
        className: "mx-auto mb-3 opacity-30"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        renderId: "render-c6c96537",
        as: "p",
        children: "No matches found"
      })]
    }) : Object.entries(grouped).map(([date, dayMatches]) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "mb-8",
      renderId: "render-d0af42e6",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-3",
        renderId: "render-3da537c0",
        as: "h3",
        children: (/* @__PURE__ */ new Date(date + "T12:00:00Z")).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 md:grid-cols-2 gap-3",
        renderId: "render-6b7500cb",
        as: "div",
        children: dayMatches.map((m) => /* @__PURE__ */ jsx(MatchCard, {
          m
        }, m.id))
      })]
    }, date))]
  });
}

const page = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Schedule, {
      ...props
    })
  });
});

const route21 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page
}, Symbol.toStringTag, { value: 'Module' }));

async function loader({
  params
}) {
  const matches = await fg("src/**/page.{js,jsx,ts,tsx}");
  return {
    path: `/${params["*"]}`,
    pages: matches.sort((a, b) => a.length - b.length).map(match => {
      const url = match.replace("src/app", "").replace(/\/page\.(js|jsx|ts|tsx)$/, "") || "/";
      const path = url.replaceAll("[", "").replaceAll("]", "");
      const displayPath = path === "/" ? "Homepage" : path;
      return {
        url,
        path: displayPath
      };
    })
  };
}
const notFound = UNSAFE_withComponentProps(function CreateDefaultNotFoundPage({
  loaderData
}) {
  const [siteMap, setSitemap] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent && window.parent !== window) {
      const handler = event => {
        if (event.data.type === "sandbox:sitemap") {
          window.removeEventListener("message", handler);
          setSitemap(event.data.sitemap);
        }
      };
      window.parent.postMessage({
        type: "sandbox:sitemap"
      }, "*");
      window.addEventListener("message", handler);
      return () => {
        window.removeEventListener("message", handler);
      };
    }
  }, []);
  const missingPath = loaderData.path.replace(/^\//, "");
  const existingRoutes = loaderData.pages.map(page => ({
    path: page.path,
    url: page.url
  }));
  const handleBack = () => {
    navigate("/");
  };
  const handleSearch = value => {
    if (!siteMap) {
      const path = `/${value}`;
      navigate(path);
    } else {
      navigate(value);
    }
  };
  const handleCreatePage = useCallback(() => {
    window.parent.postMessage({
      type: "sandbox:web:create",
      path: missingPath,
      view: "web"
    }, "*");
  }, [missingPath]);
  return /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
    className: "flex sm:w-full w-screen sm:min-w-[850px] flex-col",
    renderId: "render-fd52d3df",
    as: "div",
    children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex w-full items-center gap-2 p-5",
      renderId: "render-f865c30d",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        type: "button",
        onClick: handleBack,
        className: "flex items-center justify-center w-10 h-10 rounded-md",
        renderId: "render-97af9664",
        as: "button",
        children: /* @__PURE__ */jsxs("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 18 18",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-label": "Back",
          role: "img",
          children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
            d: "M8.5957 2.65435L2.25005 9L8.5957 15.3457",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-debc40fc",
            as: "path"
          }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            d: "M2.25007 9L15.75 9",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-7a9d09c4",
            as: "path"
          })]
        })
      }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "flex flex-row divide-x divide-gray-200 rounded-[8px] h-8 w-[300px] border border-gray-200 bg-gray-50 text-gray-500",
        renderId: "render-636383e8",
        as: "div",
        children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center px-[14px] py-[5px]",
          renderId: "render-3a55e602",
          as: "div",
          children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            renderId: "render-750bea75",
            as: "span",
            children: "/"
          })
        }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center min-w-0",
          renderId: "render-052b6eb8",
          as: "div",
          children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "border-0 bg-transparent px-3 py-2 focus:outline-none truncate max-w-[300px]",
            style: {
              minWidth: 0
            },
            title: missingPath,
            renderId: "render-40a488d7",
            as: "p",
            children: missingPath
          })
        })]
      })]
    }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex flex-grow flex-col items-center justify-center pt-[100px] text-center gap-[20px]",
      renderId: "render-b3dde252",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "text-4xl font-medium text-gray-900 px-2",
        renderId: "render-78495c0c",
        as: "h1",
        children: "Uh-oh! This page doesn't exist (yet)."
      }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "pt-4 pb-12 px-2 text-gray-500",
        renderId: "render-e74ee0f2",
        as: "p",
        children: ['Looks like "', /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "font-bold",
          renderId: "render-e57012a6",
          as: "span",
          children: ["/", missingPath]
        }), `" isn't part of your project. But no worries, you've got options!`]
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "px-[20px] w-full",
        renderId: "render-708165a1",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "flex flex-row justify-center items-center w-full max-w-[800px] mx-auto border border-gray-200 rounded-lg p-[20px] mb-[40px] gap-[20px]",
          renderId: "render-63a0eb25",
          as: "div",
          children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-[5px] items-start self-start w-1/2",
            renderId: "render-ec07f1a5",
            as: "div",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "text-sm text-black text-left",
              renderId: "render-736f998d",
              as: "p",
              children: "Build it from scratch"
            }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
              className: "text-sm text-gray-500 text-left",
              renderId: "render-cbe6800b",
              as: "p",
              children: ['Create a new page to live at "', /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
                renderId: "render-ce3d0ed9",
                as: "span",
                children: ["/", missingPath]
              }), '"']
            })]
          }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "flex flex-row items-center justify-end w-1/2",
            renderId: "render-f68f772e",
            as: "div",
            children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              type: "button",
              className: "bg-black text-white px-[10px] py-[5px] rounded-md",
              onClick: () => handleCreatePage(),
              renderId: "render-68cecb3b",
              as: "button",
              children: "Create Page"
            })
          })]
        })
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "pb-20 lg:pb-[80px]",
        renderId: "render-9eb6ae83",
        as: "div",
        children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center text-gray-500",
          renderId: "render-b58ea662",
          as: "p",
          children: "Check out all your project's routes here ↓"
        })
      }), siteMap ? /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex flex-col justify-center items-center w-full px-[50px]",
        renderId: "render-79c71404",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "flex flex-col justify-between items-center w-full max-w-[600px] gap-[10px]",
          renderId: "render-f05fc555",
          as: "div",
          children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "text-sm text-gray-300 pb-[10px] self-start p-4",
            renderId: "render-4d0a27ec",
            as: "p",
            children: "PAGES"
          }), siteMap.webPages?.map(route => /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            type: "button",
            onClick: () => handleSearch(route.cleanRoute || ""),
            className: "flex flex-row justify-between text-center items-center p-4 rounded-lg bg-white shadow-sm w-full hover:bg-gray-50",
            renderId: "render-777a4d92",
            as: "button",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "font-medium text-gray-900",
              renderId: "render-c2ce9887",
              as: "h3",
              children: route.name
            }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-400",
              renderId: "render-a2419335",
              as: "p",
              children: route.cleanRoute
            })]
          }, route.id))]
        })
      }) : /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-3 w-full max-w-[80rem] mx-auto pb-5 px-2",
        renderId: "render-3f18d46e",
        as: "div",
        children: existingRoutes.map(route => /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex flex-col flex-grow basis-full sm:basis-[calc(50%-0.375rem)] xl:basis-[calc(33.333%-0.5rem)]",
          renderId: "render-b8c5eb80",
          as: "div",
          children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            className: "w-full flex-1 flex flex-col items-center ",
            renderId: "render-fe6c2e2b",
            as: "div",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "relative w-full max-w-[350px] h-48 sm:h-56 lg:h-64 overflow-hidden rounded-[8px] border border-comeback-gray-75 transition-all group-hover:shadow-md",
              renderId: "render-e1f79edf",
              as: "div",
              children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
                type: "button",
                onClick: () => handleSearch(route.url.replace(/^\//, "")),
                className: "h-full w-full rounded-[8px] bg-gray-50 bg-cover",
                renderId: "render-77d9c957",
                as: "button"
              })
            }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "pt-3 text-left text-gray-500 w-full max-w-[350px]",
              renderId: "render-0543e3dc",
              as: "p",
              children: route.path
            })]
          })
        }, route.path))
      })]
    })]
  });
});

const route22 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: notFound,
  loader
}, Symbol.toStringTag, { value: 'Module' }));

const serverManifest = {'entry':{'module':'/assets/entry.client-1yfc_suf.js','imports':['/assets/chunk-QUQL4437-DcZv18V4.js','/assets/index-vXugNV1D.js'],'css':[]},'routes':{'root':{'id':'root','parentId':undefined,'path':'','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':true,'module':'/assets/root-C9jH8buj.js','imports':['/assets/chunk-QUQL4437-DcZv18V4.js','/assets/index-vXugNV1D.js','/assets/PolymorphicComponent-CAKCqRVX.js'],'css':['/assets/root-DaBX6gTn.css'],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'page':{'id':'page','parentId':'root','path':undefined,'index':true,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-DaBdcnlO.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js','/assets/usePreferences-COhdRULd.js','/assets/useQuery-RIP7Un29.js','/assets/clock-XmVGmz7c.js','/assets/map-pin-DdrU7PAz.js','/assets/chevron-right-CK3QUP4p.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'__create/social-dev-shim/page':{'id':'__create/social-dev-shim/page','parentId':'root','path':'__create/social-dev-shim','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-DeNoMUBL.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'cities/page':{'id':'cities/page','parentId':'root','path':'cities','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page--wPFyj1d.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js','/assets/useQuery-RIP7Un29.js','/assets/search-BqS8JMEv.js','/assets/map-pin-DdrU7PAz.js','/assets/chevron-right-CK3QUP4p.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'cities/[id]/page':{'id':'cities/[id]/page','parentId':'root','path':'cities/:id','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-BmgRPZJd.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js','/assets/useQuery-RIP7Un29.js','/assets/users-JZVej6RZ.js','/assets/map-pin-DdrU7PAz.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'errors/async-effect-error/page':{'id':'errors/async-effect-error/page','parentId':'root','path':'errors/async-effect-error','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-DPRtAduZ.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'errors/event-handler-error/page':{'id':'errors/event-handler-error/page','parentId':'root','path':'errors/event-handler-error','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-Bb2ChyoL.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'errors/hook-rule/page':{'id':'errors/hook-rule/page','parentId':'root','path':'errors/hook-rule','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-CHQvGaSo.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'errors/infinite-render-loop/page':{'id':'errors/infinite-render-loop/page','parentId':'root','path':'errors/infinite-render-loop','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-CI2wTL-T.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'errors/json-parse-error/page':{'id':'errors/json-parse-error/page','parentId':'root','path':'errors/json-parse-error','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-B7azIDAh.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'errors/missing-component/page':{'id':'errors/missing-component/page','parentId':'root','path':'errors/missing-component','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page--xQfGsIT.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'errors/null-access/page':{'id':'errors/null-access/page','parentId':'root','path':'errors/null-access','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-G-qs-6lp.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'errors/render-object/page':{'id':'errors/render-object/page','parentId':'root','path':'errors/render-object','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-CSTK4pT0.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'errors/type-error-not-function/page':{'id':'errors/type-error-not-function/page','parentId':'root','path':'errors/type-error-not-function','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-BG7bj924.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'errors/undefined-access/page':{'id':'errors/undefined-access/page','parentId':'root','path':'errors/undefined-access','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-AOSdj1Bo.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'errors/unhandled-promise/page':{'id':'errors/unhandled-promise/page','parentId':'root','path':'errors/unhandled-promise','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-Rrz7O2Xl.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'events/page':{'id':'events/page','parentId':'root','path':'events','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-BhlnWPrW.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js','/assets/useQuery-RIP7Un29.js','/assets/en-US-yaXg3Pu2.js','/assets/search-BqS8JMEv.js','/assets/format-BqKmgKT_.js','/assets/clock-XmVGmz7c.js','/assets/map-pin-DdrU7PAz.js','/assets/users-JZVej6RZ.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'forums/page':{'id':'forums/page','parentId':'root','path':'forums','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-Dh4x-sIv.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js','/assets/useQuery-RIP7Un29.js','/assets/en-US-yaXg3Pu2.js','/assets/search-BqS8JMEv.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'logistics/page':{'id':'logistics/page','parentId':'root','path':'logistics','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-v3MDxJ-z.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js','/assets/useQuery-RIP7Un29.js','/assets/languages-DMoGmmnZ.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'my-matches/page':{'id':'my-matches/page','parentId':'root','path':'my-matches','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-cHrXhw3R.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js','/assets/useQuery-RIP7Un29.js','/assets/en-US-yaXg3Pu2.js','/assets/format-BqKmgKT_.js','/assets/map-pin-DdrU7PAz.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'profile/page':{'id':'profile/page','parentId':'root','path':'profile','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-DjM3yVNQ.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js','/assets/usePreferences-COhdRULd.js','/assets/languages-DMoGmmnZ.js','/assets/search-BqS8JMEv.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'schedule/page':{'id':'schedule/page','parentId':'root','path':'schedule','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-DIqD8Feb.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js','/assets/layout-B2dqgErw.js','/assets/useQuery-RIP7Un29.js','/assets/search-BqS8JMEv.js','/assets/clock-XmVGmz7c.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'__create/not-found':{'id':'__create/not-found','parentId':'root','path':'*?','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/not-found-D_sQECXY.js','imports':['/assets/PolymorphicComponent-CAKCqRVX.js','/assets/chunk-QUQL4437-DcZv18V4.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined}},'url':'/assets/manifest-d5e816da.js','version':'d5e816da','sri':undefined};

const assetsBuildDirectory = "build/client";
      const basename = "/";
      const future = {"unstable_optimizeDeps":false,"v8_passThroughRequests":false,"v8_trailingSlashAwareDataRequests":false,"unstable_previewServerPrerendering":false,"v8_middleware":false,"v8_splitRouteModules":false,"v8_viteEnvironmentApi":false};
      const ssr = true;
      const isSpaMode = false;
      const prerender = [];
      const routeDiscovery = {"mode":"lazy","manifestPath":"/__manifest"};
      const publicPath = "/";
      const entry = { module: entryServer };
      const routes = {
        "root": {
          id: "root",
          parentId: undefined,
          path: "",
          index: undefined,
          caseSensitive: undefined,
          module: route0
        },
  "page": {
          id: "page",
          parentId: "root",
          path: undefined,
          index: true,
          caseSensitive: undefined,
          module: route1
        },
  "__create/social-dev-shim/page": {
          id: "__create/social-dev-shim/page",
          parentId: "root",
          path: "__create/social-dev-shim",
          index: undefined,
          caseSensitive: undefined,
          module: route2
        },
  "cities/page": {
          id: "cities/page",
          parentId: "root",
          path: "cities",
          index: undefined,
          caseSensitive: undefined,
          module: route3
        },
  "cities/[id]/page": {
          id: "cities/[id]/page",
          parentId: "root",
          path: "cities/:id",
          index: undefined,
          caseSensitive: undefined,
          module: route4
        },
  "errors/async-effect-error/page": {
          id: "errors/async-effect-error/page",
          parentId: "root",
          path: "errors/async-effect-error",
          index: undefined,
          caseSensitive: undefined,
          module: route5
        },
  "errors/event-handler-error/page": {
          id: "errors/event-handler-error/page",
          parentId: "root",
          path: "errors/event-handler-error",
          index: undefined,
          caseSensitive: undefined,
          module: route6
        },
  "errors/hook-rule/page": {
          id: "errors/hook-rule/page",
          parentId: "root",
          path: "errors/hook-rule",
          index: undefined,
          caseSensitive: undefined,
          module: route7
        },
  "errors/infinite-render-loop/page": {
          id: "errors/infinite-render-loop/page",
          parentId: "root",
          path: "errors/infinite-render-loop",
          index: undefined,
          caseSensitive: undefined,
          module: route8
        },
  "errors/json-parse-error/page": {
          id: "errors/json-parse-error/page",
          parentId: "root",
          path: "errors/json-parse-error",
          index: undefined,
          caseSensitive: undefined,
          module: route9
        },
  "errors/missing-component/page": {
          id: "errors/missing-component/page",
          parentId: "root",
          path: "errors/missing-component",
          index: undefined,
          caseSensitive: undefined,
          module: route10
        },
  "errors/null-access/page": {
          id: "errors/null-access/page",
          parentId: "root",
          path: "errors/null-access",
          index: undefined,
          caseSensitive: undefined,
          module: route11
        },
  "errors/render-object/page": {
          id: "errors/render-object/page",
          parentId: "root",
          path: "errors/render-object",
          index: undefined,
          caseSensitive: undefined,
          module: route12
        },
  "errors/type-error-not-function/page": {
          id: "errors/type-error-not-function/page",
          parentId: "root",
          path: "errors/type-error-not-function",
          index: undefined,
          caseSensitive: undefined,
          module: route13
        },
  "errors/undefined-access/page": {
          id: "errors/undefined-access/page",
          parentId: "root",
          path: "errors/undefined-access",
          index: undefined,
          caseSensitive: undefined,
          module: route14
        },
  "errors/unhandled-promise/page": {
          id: "errors/unhandled-promise/page",
          parentId: "root",
          path: "errors/unhandled-promise",
          index: undefined,
          caseSensitive: undefined,
          module: route15
        },
  "events/page": {
          id: "events/page",
          parentId: "root",
          path: "events",
          index: undefined,
          caseSensitive: undefined,
          module: route16
        },
  "forums/page": {
          id: "forums/page",
          parentId: "root",
          path: "forums",
          index: undefined,
          caseSensitive: undefined,
          module: route17
        },
  "logistics/page": {
          id: "logistics/page",
          parentId: "root",
          path: "logistics",
          index: undefined,
          caseSensitive: undefined,
          module: route18
        },
  "my-matches/page": {
          id: "my-matches/page",
          parentId: "root",
          path: "my-matches",
          index: undefined,
          caseSensitive: undefined,
          module: route19
        },
  "profile/page": {
          id: "profile/page",
          parentId: "root",
          path: "profile",
          index: undefined,
          caseSensitive: undefined,
          module: route20
        },
  "schedule/page": {
          id: "schedule/page",
          parentId: "root",
          path: "schedule",
          index: undefined,
          caseSensitive: undefined,
          module: route21
        },
  "__create/not-found": {
          id: "__create/not-found",
          parentId: "root",
          path: "*?",
          index: undefined,
          caseSensitive: undefined,
          module: route22
        }
      };
      
      const allowedActionOrigins = false;

export { allowedActionOrigins, serverManifest as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
