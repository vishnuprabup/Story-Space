export const truncateHTML = (html, maxWords) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const textContent = div.textContent || div.innerText;

  const words = textContent.trim().split(/\s+/);

  if (words.length > maxWords) {
    const truncatedWords = words.slice(0, maxWords);
    const truncatedText = truncatedWords.join(" ");
    return `${truncatedText}....`;
  }

  return textContent;
};
