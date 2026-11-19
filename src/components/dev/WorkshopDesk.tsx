"use client";

import { useEffect, useRef, useState, type ComponentType, type MouseEvent } from "react";
import { site } from "@/content/site";
import { workshop, type DeskObjectId } from "@/content/workshop";
import {
  CertificatesArt, LaptopArt, MugArt, PenArt, PhoneArt, PlantArt, ResumeArt, SketchbookArt, ToolboxArt,
} from "./workshop/DeskArt";
import { AboutPanel, ContactPanel, EducationPanel, ProjectsPanel, SketchbookPanel, SkillsPanel } from "./workshop/Panels";

type PanelId = Exclude<DeskObjectId, "resume">;

/** Where each object sits on the desk, as % of the desk's width/height. */
type Placement = { left: number; top: number; width: number; rotate?: number };

const objects: { id: DeskObjectId; Art: ComponentType<{ className?: string }>; at: Placement }[] = [
  { id: "sketchbook", Art: SketchbookArt, at: { left: 7, top: 9, width: 17, rotate: -6 } },
  { id: "laptop", Art: LaptopArt, at: { left: 31, top: 8, width: 34 } },
  { id: "toolbox", Art: ToolboxArt, at: { left: 71, top: 7, width: 22, rotate: 4 } },
  { id: "certificates", Art: CertificatesArt, at: { left: 5, top: 56, width: 20 } },
  { id: "resume", Art: ResumeArt, at: { left: 31, top: 63, width: 11.5, rotate: -5 } },
  { id: "phone", Art: PhoneArt, at: { left: 63, top: 60, width: 6.5, rotate: 8 } },
  { id: "mug", Art: MugArt, at: { left: 77, top: 56, width: 12 } },
];

const panels: Record<PanelId, ComponentType> = {
  laptop: ProjectsPanel,
  sketchbook: SketchbookPanel,
  toolbox: SkillsPanel,
  certificates: EducationPanel,
  phone: ContactPanel,
  mug: AboutPanel,
};

export default function WorkshopDesk() {
  const [open, setOpen] = useState<PanelId | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  function onDialogClick(e: MouseEvent<HTMLDialogElement>) {
    // A click on the backdrop lands on the <dialog> element itself.
    if (e.target === dialog.current) {
      dialog.current?.close();
      return;
    }
    // Links into the stacked page close the dialog first, then scroll there and move focus.
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-close]");
    if (!link) return;
    e.preventDefault();
    const hash = link.getAttribute("href") ?? "";
    dialog.current?.close();
    const target = document.querySelector<HTMLElement>(hash);
    if (!target) return;
    history.pushState(null, "", hash);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.scrollIntoView();
  }

  const Panel = open ? panels[open] : null;
  const meta = open ? workshop.objects[open] : null;

  return (
    <>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[28px] bg-cream-deep shadow-[6px_8px_0_var(--color-charcoal)] ring-[3px] ring-charcoal">
        {/* desk grain and mat: purely decorative */}
        <div aria-hidden className="absolute inset-0 opacity-60 [background-image:repeating-linear-gradient(176deg,transparent_0_34px,#c2410c0d_34px_36px)]" />
        <div aria-hidden className="absolute top-[4%] left-[27%] h-[68%] w-[42%] rounded-3xl bg-teal/20 ring-2 ring-teal-deep/25" />
        <PlantArt className="pointer-events-none absolute top-[-6%] left-[-3%] w-[11%] select-none" />
        <PenArt className="pointer-events-none absolute top-[88%] left-[46%] w-[13%] rotate-[-8deg] select-none" />
        <div aria-hidden className="absolute top-[70%] left-[47%] w-[11%] rotate-[4deg] bg-orange-200 p-3 shadow-[2px_3px_0_var(--color-charcoal)] ring-2 ring-charcoal">
          <p className="font-heading text-[0.95rem] leading-tight font-semibold">{workshop.stickyNote}</p>
        </div>

        {objects.map(({ id, Art, at }) => {
          const meta = workshop.objects[id];
          const style = { left: `${at.left}%`, top: `${at.top}%`, width: `${at.width}%` };
          const inner = (
            <>
              <span className="block transition-transform duration-200 ease-out group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5 group-active:scale-[0.97] motion-reduce:translate-none" style={{ rotate: `${at.rotate ?? 0}deg` }}>
                <Art className="h-auto w-full drop-shadow-[3px_4px_0_var(--color-charcoal)]" />
              </span>
              <span className="pointer-events-none absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white px-3 py-1 font-heading text-sm font-semibold whitespace-nowrap shadow-[0_2px_0_var(--color-charcoal)] ring-2 ring-charcoal transition-colors duration-150 group-hover:bg-orange group-focus-visible:bg-orange">
                {meta.label}
              </span>
              <span className="sr-only">: {meta.hint}</span>
            </>
          );
          const cls = "group absolute cursor-pointer rounded-xl focus-visible:outline-offset-8";
          return id === "resume" ? (
            <a key={id} href={site.resumeUrl} target="_blank" rel="noopener noreferrer" data-track="resume_click" data-track-label="workshop" className={cls} style={style}>{inner}</a>
          ) : (
            <button key={id} type="button" onClick={() => setOpen(id)} className={cls} style={style} aria-haspopup="dialog">
              {inner}
            </button>
          );
        })}
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="workshop-panel-title"
        onClose={() => setOpen(null)}
        onClick={onDialogClick}
        className="workshop-dialog m-auto max-h-[85vh] w-[min(52rem,calc(100vw-3rem))] overflow-y-auto overscroll-contain rounded-3xl bg-cream p-0 text-charcoal shadow-[8px_10px_0_var(--color-charcoal)] ring-[3px] ring-charcoal backdrop:bg-charcoal/55"
      >
        {Panel && meta && (
          <div className="p-7">
            <div className="mb-6 flex items-start justify-between gap-6">
              <h2 id="workshop-panel-title" className="text-2xl font-bold">{meta.title}</h2>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                className="press grid h-10 w-10 shrink-0 place-items-center rounded-full ring-2 ring-charcoal hover:bg-charcoal hover:text-cream"
              >
                <span aria-hidden className="text-xl leading-none">×</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <Panel />
          </div>
        )}
      </dialog>
    </>
  );
}
