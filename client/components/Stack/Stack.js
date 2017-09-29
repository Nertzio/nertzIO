/*

*/


const Stack = ({cards}) => {
  return (
    <div>
      {cards.map((card, idx) => {

        <Card key={card.id} style={{zIndex: idx}} {...card} />
      })}
    </div>
  )
}
