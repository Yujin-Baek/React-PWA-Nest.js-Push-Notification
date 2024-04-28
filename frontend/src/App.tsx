function App() {
  async function subscribeUser() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          "BGzVkVEnpeQWOqPlwkq2zeO0tlqmbHDjw3pwalFYc9hxU7q-v8EbM1rQvuhn-ZbgJxGZNhDbxzQnTJwaBTW35io",
      });

      // 서버에 구독 정보를 보내 저장합니다
      const response = await fetch(
        "http://localhost:4000/notifications/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription),
        }
      );
      const responseData = await response.json();
      const token = document.getElementById("deviceToken");
      if (!token) return;
      token.innerHTML = JSON.stringify(subscription);
      console.log(responseData);
    } catch (error) {
      console.error("Error during subscription:", error);
    }
  }

  async function sendPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      console.log("!!!!!!!!!!1", subscription);
      if (!subscription) {
        console.error("No subscription detected.");
        return;
      }
      // 서버에 구독 정보를 보내 저장합니다
      const response = await fetch("http://localhost:4000/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });
      const responseData = await response.json();
      console.log(responseData.message);
    } catch (error) {
      console.error("Error during push:", error);
    }
  }

  return (
    <div className="App">
      <button onClick={subscribeUser}>알림 구독</button>
      <button onClick={sendPush}>알림 푸시</button>
    </div>
  );
}

export default App;
