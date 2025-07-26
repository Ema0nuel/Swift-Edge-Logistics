// Simple toastr utility for notifications

const toastr = {
    success: (message, timeout = 3000) => {
        showToast(message, "success", timeout);
    },
    error: (message, timeout = 3000) => {
        showToast(message, "error", timeout);
    },
    info: (message, timeout = 3000) => {
        showToast(message, "info", timeout);
    },
    warning: (message, timeout = 3000) => {
        showToast(message, "warning", timeout);
    }
};

function showToast(message, type = "info", timeout = 3000) {
    // Create container if not exists
    let container = document.getElementById("toastr-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastr-container";
        container.style.position = "fixed";
        container.style.top = "24px";
        container.style.right = "24px";
        container.style.zIndex = "9999";
        document.body.appendChild(container);
    }

    // Toast element
    const toast = document.createElement("div");
    toast.className = `toastr-toast toastr-${type}`;
    toast.style.background = type === "success" ? "#38a169"
        : type === "error" ? "#e53e3e"
            : type === "warning" ? "#dd6b20"
                : "#3182ce";
    toast.style.color = "#fff";
    toast.style.padding = "12px 20px";
    toast.style.marginBottom = "12px";
    toast.style.borderRadius = "6px";
    toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";
    toast.style.fontSize = "1rem";
    toast.style.fontWeight = "500";
    toast.style.opacity = "0.95";
    toast.innerText = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.remove();
            // Remove container if empty
            if (container.childElementCount === 0) container.remove();
        }, 400);
    }, timeout);
}

export default toastr;