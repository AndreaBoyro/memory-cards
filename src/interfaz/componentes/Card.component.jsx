export const Card = ({ card, onClick }) => {
  return (
    <div
      className={`card-component  ${card.selected !== undefined ? ' card-selected-' + card.selected : ''}`}
      id={card.id}
      onClick={() => onClick(card.id)}
    >
      {card.isFlipped ? (
        <div className='card-front'>
          <span>
            <strong>{card.id}</strong>
          </span>
        </div>
      ) : (
        <div className='card-back'>
          <img src='assets/media/question-mark.svg' alt='Seleccionar carta' />
        </div>
      )}
    </div>
  );
};
