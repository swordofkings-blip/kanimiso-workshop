/**
 * @title 受付マスコット画像フォールバック制御
 * @description assets/hana.png が未配置または読み込み失敗時に、崩れないプレースホルダー表示へ切り替える。
 * @param {HTMLImageElement} imgEl - マスコット画像のimg要素
 * @param {HTMLElement} frameEl - 画像枠の親コンテナ要素
 * @returns {void}
 */
function setupHanaImageFallback(imgEl, frameEl) {
  if (!imgEl || !frameEl) {
    return;
  }

  const showPlaceholder = () => {
    frameEl.classList.add("is-placeholder");
  };

  // 画像差し替え後に正常読み込みできた場合はプレースホルダーを解除するため監視する
  imgEl.addEventListener("error", showPlaceholder);
  imgEl.addEventListener("load", () => {
    if (imgEl.naturalWidth > 0) {
      frameEl.classList.remove("is-placeholder");
    } else {
      showPlaceholder();
    }
  });

  // キャッシュ等でスクリプト実行前に読み込み失敗が確定していたケースを拾う
  if (imgEl.complete && imgEl.naturalWidth === 0) {
    showPlaceholder();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const hanaImage = document.getElementById("hana-image");
  const hanaFrame = document.getElementById("hana-frame");
  setupHanaImageFallback(hanaImage, hanaFrame);
});
