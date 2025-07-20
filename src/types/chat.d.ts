export interface ChatRoom {
  chatRoomId: number;
  roomName: string;
  lastMessage?: string;
  lastMessageTime?: string;
  imageUrl?: string;
  // Add other properties as needed based on the API response
}
