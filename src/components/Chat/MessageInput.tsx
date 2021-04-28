import React, { FC, useState } from 'react';
import { createStyles } from '../../hooks/useTheme';
import TextInput from '../core/TextInput';

interface MessageInputProps {}

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

export const MessageInput: FC<MessageInputProps> = () => {
  const [value, setValue] = useState('');
  const styles = useMessageInputStyle();

  return (
    <div className={styles.container}>
      <TextInput value={value} onChange={e => setValue(e.currentTarget.value)} />
    </div>
  );
};
export default MessageInput;
