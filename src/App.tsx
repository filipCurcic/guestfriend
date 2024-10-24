import { Stack } from './components/common/Stack';
import { Board } from './components/Board';
import { SearchBar } from './components/SearchBar';

import { useTokens } from './theme/tokens';

import { DndContext, pointerWithin } from '@dnd-kit/core';

import { useDragAndDrop } from './hooks/useDragAndDrop';
import { Typography } from './components/common/Typography';
import { mapResponsiveValues } from './responsive/mapResponsiveValues';

function App() {
  const tokens = useTokens();
  const { activeItem, sensors, handleDragStart, handleDragEnd } =
    useDragAndDrop(100, 5);

  return (
    <Stack
      center
      css={{
        marginTop: tokens.space['large-sm'],
      }}
    >
      <Stack
        vertical
        gap="small-md"
        css={[
          {
            height: '100%',
            background: tokens.colors.white,
          },
          mapResponsiveValues({
            sm: { width: '100%' },
            md: { width: '70%' },
            lg: { width: '60%' },
          }),
        ]}
      >
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          collisionDetection={pointerWithin}
        >
          <header>
            <Stack horizontal justify="center">
              <Typography as="h1" color="black" css={{ margin: '0 auto' }}>
                Kanban Board
              </Typography>

              <SearchBar />
            </Stack>
          </header>
          <main>
            <Board activeItem={activeItem} />
          </main>
        </DndContext>
      </Stack>
    </Stack>
  );
}

export default App;
