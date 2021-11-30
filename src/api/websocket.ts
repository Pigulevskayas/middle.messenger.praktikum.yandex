let socket;

export default function websocketConnection(userId: string, chatId: string, token: string) {
	socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

	socket.addEventListener('open', () => {
		console.log('Соединение установлено');
	});

	socket.addEventListener('close', event => {
		if (event.wasClean) {
			console.log('Соединение закрыто чисто');
		} else {
			console.log('Обрыв соединения');
		}
	});

	// socket.addEventListener('message', event => {
	// 	console.log('Получены данные', event.data);
	// });

	// socket.addEventListener('error', event => {
	// 	console.log('Ошибка', event.message);
	// });

	return socket;
}
