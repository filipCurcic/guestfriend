import { Board } from './components/Board';
import { Stack } from './components/common/Stack';

import { useTokens } from './theme/tokens';

function App() {
  const tokens = useTokens();
  return (
    <Stack
      center
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Stack
        vertical
        style={{
          width: '60%',
          height: '100%',
          background: tokens.colors.white,
        }}
      >
        <Board />
      </Stack>
    </Stack>
  );
}

export default App;
