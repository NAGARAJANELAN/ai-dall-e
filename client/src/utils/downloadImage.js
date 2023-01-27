import FileSaver from "file-saver";

export async function downloadImage(prompt, photo) {
    FileSaver.saveAs(photo, `download-${prompt}.jpg`);
}