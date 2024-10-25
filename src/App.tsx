import { SearchBar } from './components/Search/SearchBar';
import { Board } from './components/Board/Board';

import { DndContext, pointerWithin } from '@dnd-kit/core';

import { useDragAndDrop } from './hooks/useDragAndDrop';
import {
  StyledAppContainer,
  StyledAppHeader,
  StyledHeaderTitle,
  StyledInnerContainer,
} from './ui/App';

function App() {
  const { activeItem, sensors, handleDragStart, handleDragEnd } =
    useDragAndDrop(100, 5);

  return (
    <StyledAppContainer center>
      <StyledInnerContainer direction="vertical" gap="small-md">
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          collisionDetection={pointerWithin}
        >
          <StyledAppHeader>
            <StyledHeaderTitle as="h1" color="black">
              Kanban Board
            </StyledHeaderTitle>

            <SearchBar />
          </StyledAppHeader>
          <main>
            <Board activeItem={activeItem} />
          </main>
        </DndContext>
      </StyledInnerContainer>
    </StyledAppContainer>
  );
}

export default App;
