// =========ローディング
//ローディング要素
const loading = document.querySelector('.loading');

//ページが読み込み終わったら
window.addEventListener('load', () => {
  //1秒後に
  setTimeout(function () {
    //ローディング要素にloadedクラスを付与
    loading.classList.add('loaded');
  }, 6000);
});
// =========ローディング end


// =========動画再生
document.addEventListener('DOMContentLoaded', (event) => {
  var video = document.getElementById("video1");

  // 動画が音声を含む場合はミュートする
  setTimeout(function () {
    video.muted = true;
    video.play();
  }, 5500);
});
// =========動画再生 end


// =========お知らせ
$(document).ready(function () {
  let slideIndex = 0;
  const slides = $(".carousel-item");
  const totalSlides = slides.length;
  const indicatorsContainer = $(".carousel-indicators");

  // インジケーターの生成
  for (let i = 0; i < totalSlides; i++) {
    const indicator = $("<div>").addClass("carousel-indicator");
    if (i === 0) indicator.addClass("active");
    indicatorsContainer.append(indicator);
  }
  const indicators = $(".carousel-indicator");

  function showSlide(index) {
    slides.each(function (i) {
      $(this).css("transition", "none"); // 一旦アニメーションを無効にする
      if (i === index) {
        $(this).css({ left: "100%", opacity: "1" }); // 右側に配置
      }
    });

    // アニメーションを有効にしてスライドイン
    setTimeout(function () {
      slides.each(function (i) {
        $(this).css(
          "transition",
          "left 0.5s ease-in-out, opacity 0.5s ease-in-out"
        );
        if (i === index) {
          $(this).css({ left: "0" }); // 現在のスライドを表示
        } else {
          $(this).css({ left: "-100%", opacity: "0" }); // 左に移動して非表示にする
        }
      });
    }, 100);

    indicators.removeClass("active").eq(index).addClass("active");
  }

  // 最初のスライドを表示
  showSlide(slideIndex);

  $("#nextBtn").click(function () {
    slideIndex = (slideIndex + 1) % totalSlides;
    showSlide(slideIndex);
  });

  $("#prevBtn").click(function () {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    showSlide(slideIndex);
  });

  indicators.click(function () {
    const index = indicators.index(this);
    slideIndex = index;
    showSlide(slideIndex);
  });

  // 自動でスライドを切り替える場合
  setInterval(function () {
    slideIndex = (slideIndex + 1) % totalSlides;
    showSlide(slideIndex);
  }, 5000); // 5秒ごとにスライド
});
// =========お知らせ end


// =========泡
document.addEventListener('DOMContentLoaded', () => {
  // コンテナを指定
  const section = document.querySelector('.bubble-background');

  // 泡を生成する関数
  const createBubble = () => {
    const bubbleEl = document.createElement('span');
    bubbleEl.className = 'bubble';
    const minSize = 10;
    const maxSize = 50;
    const size = Math.random() * (maxSize + 1 - minSize) + minSize;
    bubbleEl.style.width = `${size}px`;
    bubbleEl.style.height = `${size}px`;
    bubbleEl.style.left = Math.random() * innerWidth + 'px';
    section.appendChild(bubbleEl);

    // 一定時間が経てば泡を消す
    setTimeout(() => {
      bubbleEl.remove();
    }, 15000);
  }

  // 泡の生成を開始するトリガー（初期値はOFF）
  let activeBubble = null;

  // 泡の生成をストップする関数
  const stopBubble = () => {
    clearInterval(activeBubble);
  };

  // Intersection observerに渡すコールバック関数
  const cb = (entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        activeBubble = setInterval(createBubble, 300);
      } else {
        stopBubble();
      }
    })
  };

  // Intersection observerに渡すオプション
  const options = {
    rootMargin: "100px 0px"
  }

  // Intersection observerの初期化
  const io = new IntersectionObserver(cb, options);
  io.POLL_INTERVAL = 100; // Polyfill
  io.observe(section);
});
// =========泡 end


// =========戻るボタン
// スクロールイベントを監視して、ページトップへ戻るボタンの表示を切り替える
document.addEventListener("DOMContentLoaded", (event) => {
  const pageTop = document.getElementById("page-top"); // ボタンの要素を取得

  window.addEventListener("scroll", () => {
    // 一定のスクロール位置を超えたらクラスを追加して表示
    if (window.scrollY > 100) {
      pageTop.classList.add("show");
    } else {
      pageTop.classList.remove("show");
    }
  });
});
// =========戻るボタン end


// =========parallax
const image = document.getElementsByClassName("thumbnail");
new simpleParallax(image, {
  scale: 1.5,
  orientation: "left",
});

const image2 = document.getElementsByClassName("thumbnail2");
new simpleParallax(image2, {
  scale: 1.5,
  orientation: "right",
});
// =========parallax end


// =========波
var info = {
  seconds: 0,
  t: 0,
};

var canvasList = [];
var colorList = [];
var unit = 50; // 波の高さの単位を設定

function init() {
  // document.getElementsByClassNameはHTMLCollectionを返すため、Array.fromで配列に変換する
  var canvases = Array.from(document.getElementsByClassName("waveCanvas"));
  colorList = canvases.map(function() { // 各キャンバスに対して色の配列を設定
    return ["rgba(114, 184, 255, 0.5)", "rgba(114, 184, 255, .5)"];
  });

  canvases.forEach(function(canvas) {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = 150;
    canvas.contextCache = canvas.getContext("2d");
    canvasList.push(canvas); // canvasListにキャンバスを追加
  });

  update();
}

function update() {
  canvasList.forEach(function(canvas, index) {
    draw(canvas, colorList[index]); // 各キャンバスに対応する色の配列を使用
  });

  info.seconds = info.seconds + 0.0070;
  info.t = info.seconds * Math.PI;
  setTimeout(update, 35);
}

function draw(canvas, color) {
  var context = canvas.contextCache;
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawWave(canvas, color[0], 1, 3, 0);
  drawWave(canvas, color[1], 1, 2, 250);
  drawWave(canvas, color[2], 1, 1.6, 100);
}

function drawWave(canvas, color, alpha, zoom, delay) {
  var context = canvas.contextCache;
  context.fillStyle = color;
  context.globalAlpha = alpha;
  context.beginPath();
  drawSine(canvas, info.t / 0.5, zoom, delay);
  context.lineTo(canvas.width + 10, canvas.height);
  context.lineTo(0, canvas.height);
  context.closePath();
  context.fill();
}

function drawSine(canvas, t, zoom, delay) {
  var xAxis = Math.floor(canvas.height / 2);
  var yAxis = 0;
  var context = canvas.contextCache;
  var x = t;
  var y = Math.sin(x) / zoom;
  context.moveTo(yAxis, unit * y + xAxis);
  for (var i = yAxis; i <= canvas.width + 10; i += 10) {
    x = t + (-yAxis + i) / unit / zoom;
    y = Math.sin(x - delay) / 3;
    context.lineTo(i, unit * y + xAxis);
  }
}

init();
// =========波 end


// =========modal
$(document).ready(function() {
  // モーダルを開くイベント
  $('.modal-open').on('click', function(e) {
    e.preventDefault(); // リンクのデフォルトの動作を防ぐ
    var targetModal = $(this).attr('href');
    $(targetModal).fadeIn(); // モーダルをフェードインで表示
    $('body').css('overflow', 'hidden'); // スクロールを無効にする
  });

  // モーダルを閉じるイベント
  $('.modal-close').on('click', function() {
    $(this).closest('.modal').fadeOut(); // モーダルをフェードアウトで非表示
    $('body').css('overflow', ''); // スクロールを有効にする
  });

  // モーダルの外側をクリックしたときにモーダルを閉じる
  $(document).on('click', function(e) {
    if ($(e.target).is('.modal')) {
      $('.modal').fadeOut(); // モーダルをフェードアウトで非表示
      $('body').css('overflow', ''); // スクロールを有効にする
    }
  });
});
// =========modal end


// =========accordion
$(".accordion-wrap").on("click", function () {
  $(this).children().eq(1).slideToggle(300);
  $(this).children().eq(0).toggleClass("accordion-no-bar");
  $(this).siblings().find(".accordion-header").removeClass("accordion-gold");
  $(this).siblings().find(".accordion-header i").removeClass("rotate-fa");
  $(this).find(".accordion-header").toggleClass("accordion-gold");
  $(this).find(".fa").toggleClass("rotate-fa");

  $(".accordion-wrap .accordion-text").not($(this).children().eq(1)).slideUp(300);
});
// =========accordion end