import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

window.showToast = function ({ text, type = "success" }) {
    Toastify({
        text,
        duration: 4000,
        gravity: "top",
        position: "right",
        backgroundColor: type === "success" ? "#22c55e" : "#ef4444",
    }).showToast();
};
