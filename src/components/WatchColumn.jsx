import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function WatchColumn({ title, type, films }) {
  const { setNodeRef } = useDroppable({
    id: type
  });

  return (
    <div ref={setNodeRef} className="watch-column">
      <h3>{title}</h3>

      {films.map(film => (
        <SortableItem key={film.id} film={film} />
      ))}
    </div>
  );
}

function SortableItem({ film }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: film.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="watch-card"
    >
      {film.title}
    </div>
  );
}

export default WatchColumn;