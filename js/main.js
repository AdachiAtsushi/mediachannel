// 要素を取得
var timer = document.getElementById('timer');
var start = document.getElementById('start');
var reset = document.getElementById('reset');
var min_plus = document.getElementById('min_plus');
var min_minus = document.getElementById('min_minus');

// 開始時間
var startTime;
// 表示時間
var displayTime;
// カウントダウンする時間
var countTime = 0;
// 経過時間
var elapsedTime;
// カウントダウン停止後に時間をクリアする
var timerId;
// 停止判定
var isRunning = false;

// スタートボタン押下時に実行
start.addEventListener('click', function() {    
    // 停止判定がfalseの場合、カウントダウン開始
    if (isRunning == false) {
        isRunning = true;
        
        // スタートボタンの表記をストップに変更する
        start.textContent = 'stop';
        
        // 現在時刻を取得
        startTime = Date.now();
    
        // 設定時間からカウントダウン開始
        countDown();
    } else {
        isRunning = false;
        
        // スタートボタンの表記をストップに変更する
        start.textContent = 'start';

        countTime = displayTime;

        clearTimeout(timerId);
    }
});

// 分(+)押下時に実行
min_plus.addEventListener('click', function() {
    // カウントダウン実施時、時間を追加を制御
    if (isRunning == true) {
        return;
    }
    countTime　+= 60 * 1000;

    updateTimer(countTime);
});

// 分(-)押下時に実行
min_minus.addEventListener('click', function() {
    // 0秒の場合、処理終了
    if (0 == countTime) {
        return;
    }

    // カウントダウン実施時、時間を追加を制御
    if (isRunning == true) {
        return;
    }
    
    countTime　-= 60 * 1000;

    updateTimer(countTime);
});

// 時間をリセットする処理
reset.addEventListener('click', function() {
    // カウントダウン時間に0を代入
    countTime = 0;

    updateTimer(countTime);
});


function countDown() {
    // 一定間隔で実行 
    timerId = setTimeout(function() {
        // 経過時間を算出
        elapsedTime = Date.now() - startTime;

        // カウントする時間から経過時間の差を表示時間に代入
        displayTime　= countTime - elapsedTime;
        
        // 表示時間が0秒の場合
        if (displayTime < 0) {
            clearTimeout(timerId);

            isRunning = false;

            // 停止後のボタン表記を変更
            start.textContent = 'start';
            
            // 0秒と表示するため表示時間に0を代入
            displayTime = 0;

            // リスタートを防ぐため0を代入
            countTime = 0;

            updateTimer(displayTime);   

            return;
        }

        updateTimer(displayTime)
        
        countDown();

    }, 10);
}

// 残り時間算出
function updateTimer(ms) {
    var time = new Date(ms);
    
    // 分、秒、ミリ秒を取得
    var minute = time.getMinutes();
    var second = time.getSeconds();
    var milliSecond = time.getUTCMilliseconds();
    
    // 表示を0埋めに編集
    minute = ('0' + minute).slice(-2);
    second = ('0' + second).slice(-2);
    milliSecond = ('0' + milliSecond).slice(-2);

    // コンマ区切りで時間を表示
    timer.textContent = minute + ':' + second + '.' + milliSecond;
}

