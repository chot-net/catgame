let messagebox = document.getElementById("messagebox");
let copymessage = document.getElementById("copy-message");
copymessage.addEventListener("click", () => {
    let message = messagebox.value;
    // navigator.clipboard.writeText(message);
    document.execCommand("copy");
    copymessage.innerHTML = 'コピー完了！';

})
