import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UnreadMessagesState {
    unreadMessages: { userId: string, count: number }[];
}

const unreadMessageString = localStorage.getItem('unreadMessage');
const initialState: UnreadMessagesState = {
    unreadMessages: unreadMessageString ? JSON.parse(unreadMessageString) : [],
};

const unreadMessagesSlice = createSlice({
    name: 'unreadMessages',
    initialState,
    reducers: {
        setUnreadMessages(state, action: PayloadAction<{ userId: string, count: number }[]>) {
            state.unreadMessages = action.payload;
            localStorage.setItem('unreadMessage', JSON.stringify(state.unreadMessages));
        },
        addUnreadMessage(state, action: PayloadAction<{ userId: string }>) {
            const existing = state.unreadMessages.find(msg => msg.userId === action.payload.userId);
            if (existing) {
                existing.count += 1;
            } else {
                state.unreadMessages.push({ userId: action.payload.userId, count: 1 });
            }
            localStorage.setItem('unreadMessage', JSON.stringify(state.unreadMessages));
        },
        markMessagesAsRead(state, action: PayloadAction<{ userId: string }>) {
            const existing = state.unreadMessages.find(msg => msg.userId === action.payload.userId);
            if (existing) {
                existing.count = 0;
            }
            localStorage.setItem('unreadMessage', JSON.stringify(state.unreadMessages));
        },
    },
});

export const { setUnreadMessages, addUnreadMessage, markMessagesAsRead } = unreadMessagesSlice.actions;
export default unreadMessagesSlice.reducer;
