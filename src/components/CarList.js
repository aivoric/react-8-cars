import { useSelector, useDispatch } from 'react-redux';
import { removeCar } from '../store/';

function CarList() {
    const dispatch = useDispatch();

    const { cars, searchTerm, name } = useSelector(({ form, cars: { data, searchTerm }}) => {
        return {
            cars: data,
            searchTerm: searchTerm,
            name: form.name
        }
    });

    const handleCarDelete = (car) => {
        dispatch(removeCar(car.id));
    };

    const filteredCars = searchTerm.trim() !== ''
        ? cars.filter(car => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : cars;

    const renderedCars = filteredCars.map((car) => {
        // this tells us if the car should be bolded or not
        const bold = name && car.name.toLowerCase().includes(name.toLowerCase());

        return (
            <div key={car.id} className={`panel ${bold && 'bold'}`}>
                <p>
                    {car.name} - ${car.cost}
                </p>
                <button 
                    className="button is-danger"
                    onClick={() => handleCarDelete(car)}    
                >
                    Delete
                </button>
            </div>
        )
    });

    return <div className="car-list">
        {renderedCars}
        <hr />
    </div>
}

export default CarList;