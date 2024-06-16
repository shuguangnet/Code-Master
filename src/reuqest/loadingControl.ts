// loadingControl.js
import message from "@arco-design/web-vue/es/message";

let loadingMessageId:any = null;

export const showLoading = () => {
  if (!loadingMessageId) {
    loadingMessageId = message.loading({
      content: 'Loading...',
      duration: 0,
    });
  }
};

export const hideLoading = () => {
  if (loadingMessageId) {
    message.clear(loadingMessageId);
    loadingMessageId = null;
  }
};
