import { Stack } from './components/common/Stack';
import { Board } from './components/Board';
import { SearchBar } from './components/SearchBar';

import { useTokens } from './theme/tokens';

import { DndContext, closestCenter } from '@dnd-kit/core';

import { useDragAndDrop } from './hooks/useDragAndDrop';

function App() {
  const tokens = useTokens();
  const { activeItem, sensors, handleDragStart, handleDragEnd } =
    useDragAndDrop(100, 5);

  return (
    <Stack
      center
      css={{
        width: '100vw',
        marginTop: tokens.space['large-sm'],
      }}
    >
      <Stack
        vertical
        gap="small-md"
        css={{
          width: '100%',
          height: '100%',
          background: tokens.colors.white,
        }}
      >
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          collisionDetection={closestCenter}
        >
          <SearchBar />
          <Board activeItem={activeItem} />
        </DndContext>
      </Stack>
    </Stack>
  );
}

export default App;
