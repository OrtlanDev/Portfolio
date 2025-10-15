import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function showToast(type) {
    const IS_DESKTOP = window.innerWidth >= 768;
    const customNode = document.createElement("div");
    const checkIcon = `<svg {...Astro.props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/></svg>`;
    const xIcon = `<svg {...Astro.props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></svg>`;
    const message = type === "success" ? "¡Mensaje enviado exitosamente!" : "Error al enviar mensaje";
    const x = IS_DESKTOP ? 27 : 0;
    const y = IS_DESKTOP ? 90 : 68;
    const position = IS_DESKTOP ? "right" : "center";

    customNode.innerHTML = `
        <div class="w-min bg-background-light/25 backdrop-blur-lg border-2 border-border/55 p-[24px] shadow-lg shadow-background-dark/25 h-min">
            <div class="flex-center gap-4 text-text-primary">
            ${
                type === "success"
                    ? `<div class="border-2 p-1 border-emerald-600   bg-emerald-600/25 rotate-45">
                    <div class="w-5 h-5 -rotate-45">
                        ${checkIcon}
                    </div>
                </div>`
                    : `<div class="border-2 p-1 border-rose-600 bg-rose-600/25 rotate-45">
                    <div class="w-5 h-5 -rotate-45">
                        ${xIcon}
                    </div>
                </div>`
            }
                <span class="text-lg font-light text-nowrap">${message}.</span>
            </div>
        </div>`;

    Toastify({
        text: "",
        node: customNode,
        duration: 3000,
        gravity: "top",
        position: position,
        offset: {
            x: x,
            y: y,
        },
        style: {
            background: "transparent",
            border: "none",
            boxShadow: "none",
            padding: "0",
        },
    }).showToast();
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    if (form instanceof HTMLFormElement) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            try {
                const response = await fetch("https://formspree.io/f/mkgvagzb", {
                    method: "POST",
                    body: formData,
                    headers: { Accept: "application/json" },
                });
                if (response.ok) {
                    form.reset();
                    showToast("success");
                } else {
                    showToast("error");
                }
            } catch (error) {
                showToast("Ocurrió un error al enviar el correo.");
            }
        });
    }
});
