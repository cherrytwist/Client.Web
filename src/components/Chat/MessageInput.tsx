import React, { FC, useState } from 'react';
import { createStyles } from '../../hooks/useTheme';
import { ModernTextInput } from '../core/TextInput';

interface MessageInputProps {
  actions: {
    onConfirm: (value: string) => boolean;
  };
}

const useMessageInputStyle = createStyles(theme => ({
  container: {
    '& div': {
      '& input': {
        padding: 10,
        fontSize: theme.typography.body.size,
      },
    },
  },
}));

export const MessageInput: FC<MessageInputProps> = ({ actions }) => {
  const { onConfirm } = actions;
  const [value, setValue] = useState('');
  const styles = useMessageInputStyle();

  return (
    <div className={styles.container}>
      <ModernTextInput
        value={value}
        actions={{
          onChange: e => setValue(e.currentTarget.value),
          onEnterPressed: () => {
            const result = onConfirm(value);
            result && setValue('');
          },
        }}
      />
    </div>
  );
};
export default MessageInput;
