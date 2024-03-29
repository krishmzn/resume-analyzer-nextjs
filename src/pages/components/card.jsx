export default function Card() {
    const cards = {
        'card1': [
            {'title': 'Resume Analysis'},
            {'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, atque.'},
            {'img': './image/2.png'},
            {'alttxt': 'Analysis'},
        ],

        'card2': [
            {'title': 'Resume Analysis'},
            {'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, atque.'},
            {'img': './image/3.png'},
            {'alttxt': 'Analysis'},
        ],

        'card3': [
            {'title': 'Resume Analysis'},
            {'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, atque.'},
            {'img': './image/4.png'},
            {'alttxt': 'Analysis'},
        ],
    }
    
    return(
        <section className="">
            <div className="shead">
                <h2>Our Services</h2>
                <p>Checkout the services we provide</p>
            </div>

            <div className="flex flex-row flex-wrap items-center justify-center gap-11 ">
                {Object.entries(cards).map(([key, values]) => (
                    <div className="card lg:w-64 w-72 h-80 2xl:w-96 bg-base-100 cursor-pointer shadow hover:shadow-2xl transition-transform hover:scale-105">
                        <figure><img src={values[2].img} alt={values[3].alttxt} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{values[0].title}</h2>
                            <p>{values[1].description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}