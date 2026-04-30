const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const TOKEN = process.env.LINE_TOKEN;
const MENU_PAGE1 = process.env.MENU_PAGE1;
const MENU_PAGE2 = process.env.MENU_PAGE2;

const bookingFlex = {
  "type": "carousel",
  "contents": [
    {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": "https://res.cloudinary.com/dmqixm0dj/image/upload/f_auto,q_auto/%E9%A0%90%E7%B4%84%E6%AD%A5%E9%A9%9F_S_yft9ro",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "action": { "type": "uri", "uri": "https://www.facebook.com/livingandrestmassage" }
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          { "type": "text", "text": "預約步驟 HOW TO BOOK", "weight": "bold", "size": "lg", "wrap": true, "color": "#1a1a1a" },
          { "type": "text", "text": "1. 右滑查看課程/分店\n2. 留言給我們\n【分店、時間、預約方案】\n3. 現場僅收現金\n\n⚠️ 無任何色情服務 ‼️", "wrap": true, "size": "sm", "margin": "md", "color": "#444444" }
        ]
      },
      "footer": {
        "type": "box", "layout": "vertical", "spacing": "sm",
        "contents": [
          { "type": "text", "text": "預約制服務", "size": "xs", "color": "#888888", "align": "center" },
          { "type": "button", "action": { "type": "uri", "label": "營業時間13:00-22:30", "uri": "https://www.facebook.com/livingandrestmassage" }, "style": "link", "color": "#3d7a4f", "height": "sm" },
          { "type": "button", "action": { "type": "uri", "label": "往右查看課程方案", "uri": "https://www.instagram.com/p/CsdXnrHOfbX/" }, "style": "link", "color": "#3d7a4f", "height": "sm" }
        ]
      }
    },
    {
      "type": "bubble",
      "hero": { "type": "image", "url": "https://res.cloudinary.com/dmqixm0dj/image/upload/v1777268398/LINE_NOTE_260427_1_md31ah.jpg", "size": "full", "aspectRatio": "20:13", "aspectMode": "cover" },
      "body": {
        "type": "box", "layout": "vertical",
        "contents": [
          { "type": "text", "text": "價目表 Treatments", "weight": "bold", "size": "lg", "wrap": true, "color": "#1a1a1a" },
          { "type": "box", "layout": "vertical", "margin": "md", "spacing": "sm", "contents": [
            { "type": "box", "layout": "horizontal", "contents": [ { "type": "text", "text": "60分鐘 mins", "size": "sm", "color": "#444444", "flex": 3 }, { "type": "text", "text": "$1000", "size": "sm", "color": "#3d7a4f", "align": "end", "weight": "bold", "flex": 1 } ] },
            { "type": "box", "layout": "horizontal", "contents": [ { "type": "text", "text": "90分鐘 mins", "size": "sm", "color": "#444444", "flex": 3 }, { "type": "text", "text": "$1500", "size": "sm", "color": "#3d7a4f", "align": "end", "weight": "bold", "flex": 1 } ] },
            { "type": "box", "layout": "horizontal", "contents": [ { "type": "text", "text": "120分鐘 mins", "size": "sm", "color": "#444444", "flex": 3 }, { "type": "text", "text": "$1800", "size": "sm", "color": "#3d7a4f", "align": "end", "weight": "bold", "flex": 1 } ] }
          ]}
        ]
      },
      "footer": {
        "type": "box", "layout": "vertical", "spacing": "sm",
        "contents": [
          { "type": "button", "action": { "type": "message", "label": "當月壽星來店消費享有優惠", "text": "當月壽星出示證件即享芳療精油升級" }, "style": "link", "color": "#3d7a4f", "height": "sm" },
          { "type": "button", "action": { "type": "uri", "label": "往右查看分店資訊", "uri": "https://www.facebook.com/livingandrestmassage" }, "style": "link", "color": "#3d7a4f", "height": "sm" }
        ]
      }
    },
    {
      "type": "bubble",
      "hero": { "type": "image", "url": "https://res.cloudinary.com/dmqixm0dj/image/upload/v1777268479/IMG_0293_yfwqfe.jpg", "size": "full", "aspectRatio": "20:13", "aspectMode": "cover" },
      "body": {
        "type": "box", "layout": "vertical",
        "contents": [
          { "type": "text", "text": "中山店 Zhongshan", "weight": "bold", "size": "lg", "wrap": true, "color": "#1a1a1a" },
          { "type": "text", "text": "🏠 台北市中山區錦州街108號(錦州橋)\n🚗 汽車可停新生橋下\n🛵 機車可停本店門口", "wrap": true, "size": "sm", "margin": "md", "color": "#444444" },
          { "type": "text", "text": "鄰近中山國小站 三號出口", "size": "sm", "margin": "md", "weight": "bold", "color": "#3d7a4f", "wrap": true }
        ]
      },
      "footer": {
        "type": "box", "layout": "vertical", "spacing": "sm",
        "contents": [
          { "type": "button", "action": { "type": "uri", "label": "查看地圖 MAP", "uri": "https://goo.gl/maps/NYGNz4VaJtCHjzN66" }, "style": "link", "color": "#3d7a4f", "height": "sm" },
          { "type": "button", "action": { "type": "message", "label": "索取路線指引圖 FIND US", "text": "索取中山店路線圖" }, "style": "link", "color": "#3d7a4f", "height": "sm" }
        ]
      }
    },
    {
      "type": "bubble",
      "hero": { "type": "image", "url": "https://res.cloudinary.com/dmqixm0dj/image/upload/v1777268491/IMG_1381_jxxhdk.jpg", "size": "full", "aspectRatio": "20:13", "aspectMode": "cover" },
      "body": {
        "type": "box", "layout": "vertical",
        "contents": [
          { "type": "text", "text": "西門店 Ximen", "weight": "bold", "size": "lg", "wrap": true, "color": "#1a1a1a" },
          { "type": "text", "text": "🏠 台北市萬華區成都路67號\n🚗 汽車可以停峨嵋停車場\n🛵 機車紅樓周圍都有停車格", "wrap": true, "size": "sm", "margin": "md", "color": "#444444" },
          { "type": "text", "text": "鄰近西門站 六號出口", "size": "sm", "margin": "md", "weight": "bold", "color": "#3d7a4f", "wrap": true }
        ]
      },
      "footer": {
        "type": "box", "layout": "vertical", "spacing": "sm",
        "contents": [
          { "type": "button", "action": { "type": "uri", "label": "查看地圖 MAP", "uri": "https://goo.gl/maps/BDpsZwW18SzWozKq6" }, "style": "link", "color": "#3d7a4f", "height": "sm" },
          { "type": "button", "action": { "type": "message", "label": "索取路線指引圖 FIND US", "text": "索取西門店路線圖" }, "style": "link", "color": "#3d7a4f", "height": "sm" }
        ]
      }
    },
    {
      "type": "bubble",
      "hero": { "type": "image", "url": "https://res.cloudinary.com/dmqixm0dj/image/upload/v1777268519/N%E8%AB%8B%E7%95%99%E4%B8%8B%E6%82%A8%E7%9A%84%E8%B3%87%E6%96%99_vuvfb2.jpg", "size": "full", "aspectRatio": "20:13", "aspectMode": "cover", "action": { "type": "message", "text": "我要預約 中山店/西門店 預約日期、時間 與 按摩方案（60/90/120分鐘）" } },
      "body": {
        "type": "box", "layout": "vertical",
        "contents": [
          { "type": "text", "text": "請留下您的資料", "weight": "bold", "size": "lg", "wrap": true, "color": "#1a1a1a" },
          { "type": "text", "text": "Your Information　お客様情報をご入力ください", "size": "xs", "color": "#888888", "wrap": true, "margin": "sm" }
        ]
      },
      "footer": {
        "type": "box", "layout": "vertical",
        "contents": [
          { "type": "button", "action": { "type": "message", "label": "請留下「分店」「時間」與「方案」我們會盡快給您回覆😊", "text": "我要預約 中山店/西門店 預約日期、時間 與 按摩方案（60/90/120分鐘）" }, "style": "primary", "color": "#3d7a4f", "height": "sm" }
        ]
      }
    }
  ]
};

app.post('/webhook', async (req, res) => {
  res.sendStatus(200);
  const events = req.body.events;
  if (!events || events.length === 0) return;

  for (const event of events) {
    const userId = event.source.userId;

    if (event.type === 'postback') {
      const data = event.postback.data;
      if (data === 'action=next_page') await switchMenu(userId, MENU_PAGE2);
      else if (data === 'action=prev_page') await switchMenu(userId, MENU_PAGE1);
      else if (data === 'action=booking') await sendFlex(userId, bookingFlex);
    }

    if (event.type === 'message' && event.message.type === 'text') {
      const text = event.message.text;
      if (text === '下一頁') await switchMenu(userId, MENU_PAGE2);
      else if (text === '回主選單') await switchMenu(userId, MENU_PAGE1);
      else if (text === '呼叫預約選單') await sendFlex(userId, bookingFlex);
    }
  }
});

async function switchMenu(userId, menuId) {
  try {
    await axios.post(
      `https://api.line.me/v2/bot/user/${userId}/richmenu/${menuId}`,
      {},
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    );
  } catch (err) {
    console.error('切換選單失敗:', err.response?.data);
  }
}

async function sendFlex(userId, flexContent) {
  try {
    await axios.post(
      'https://api.line.me/v2/bot/message/push',
      {
        to: userId,
        messages: [{
          type: 'flex',
          altText: '預約資訊',
          contents: flexContent
        }]
      },
      { headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('發送Flex失敗:', err.response?.data);
  }
}

app.get('/', (req, res) => res.send('LINE Webhook is running!'));
const PORT = process.env.PORT || 3000;
// ─── KEEP ALIVE ────────────────────────────────────
const RENDER_URL = process.env.RENDER_URL;

const keepAlive = setInterval(async () => {
  if (!RENDER_URL) return;
  try {
    await axios.get(RENDER_URL + '/ping');
    console.log('Keep-alive ping sent');
  } catch (e) {
    console.log('Keep-alive ping failed:', e.message);
  }
}, 14 * 60 * 1000);

app.get('/ping', (req, res) => res.send('pong'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
