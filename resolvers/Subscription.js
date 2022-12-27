const Subscription = {
  message: {
    subscribe: async (parent, { from, to }, { pubsub, ChatBoxModel }) => {
      const createChatBoxName = (name, to) => {
        return [name, to].sort().join('_');
      };
      const chatBoxName = createChatBoxName(from, to);
      let box = await ChatBoxModel.findOne({ chatBoxName });
      if (!box) {
        throw new Error('ChatBox not found')
      }
      console.log("sub_back")
      return pubsub.subscribe(`chatbox ${chatBoxName}`);
    },
  },
};

export default Subscription;