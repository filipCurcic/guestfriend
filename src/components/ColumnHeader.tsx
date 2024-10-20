import { Button } from './common/Button';
import { Stack } from './common/Stack';
import { Typography } from './common/Typography';

import { StatusEnum } from '../types/SharedTypes';

import { Tokens, useTokens } from '../theme/tokens';

type ColumnHeaderProps = {
  title: string;
  backgroundColor: keyof Tokens['colors'];
  status: StatusEnum;
};
export const ColumnHeader = ({ title, backgroundColor }: ColumnHeaderProps) => {
  const tokens = useTokens();
  return (
    <Stack
      vertical
      style={{
        backgroundColor: tokens.colors[backgroundColor],
      }}
      padding="small-sm"
    >
      <Stack horizontal align="center">
        <Typography
          size="large-sm"
          style={{
            flexGrow: 1,
            textAlign: 'center',
          }}
          as="h5"
        >
          {title}
        </Typography>
        <Button size="large-lg" css={{ fontSize: '25px' }}>
          +
        </Button>
      </Stack>
      <Stack center>(Number of tickets)</Stack>
    </Stack>
  );
};