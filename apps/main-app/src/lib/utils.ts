/* Simple className combiner */
export function cn(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

/* Scroll to the first invalid field/error to aid accessibility */
export function scrollToError() {
    if (typeof window === "undefined") return;
    const firstInvalid =
        (document.querySelector("[aria-invalid='true']") as HTMLElement | null) ??
        (document.querySelector(".form-error") as HTMLElement | null);
    firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
    // Also try focusing the invalid control for keyboard users
    const control = firstInvalid?.closest("label")?.nextElementSibling as HTMLElement | null;
    if (control && "focus" in control) (control as HTMLInputElement).focus();
}