import { Board } from './components/Board';
import { Stack } from './components/common/Stack';

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
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          collisionDetection={closestCenter}
        >
          <Board activeItem={activeItem} />
        </DndContext>
      </Stack>
    </Stack>
  );
}

export default App;
