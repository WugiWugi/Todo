import '../pages-css/Notes.css'
import { useState, useRef, useEffect } from "react";

function Notes() {
    const [visible, setVisible] = useState(false);
    const [currentForm, setCurrentForm] = useState();
    const [list, setList] = useState(() => {
        const saved = localStorage.getItem('data');
        return saved ? JSON.parse(saved) : [];
      });
      
    const [elementClicked, setElementClicked] = useState(null);
    const [elementActive, setElementActive] = useState(null);
    const inputRef = useRef();

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(list));
      }, [list]);

    function handleclick(event) {
        event.preventDefault();
        const newItem = inputRef.current.value;
        if (!newItem) {
            alert('Enter something');
            return setVisible(false);
        }

        const uniqueId = Date.now() + Math.random();
        setList(prevList => [...prevList, [uniqueId, [newItem], []]]);
        setVisible(false);
    }

    function childClick(event) {
        event.preventDefault();
        const newItem = inputRef.current.value;

        if (!elementClicked) {
            alert('Click on the main list');
            return setVisible(false);
        } else if (!newItem) {
            alert('Enter something');
            return setVisible(false);
        }

        const updatedList = list.map(item => {
            if (item[0] === elementClicked[0]) {
                return [item[0], item[1], [...item[2], newItem]];
            }
            return item;
        });

        setList(updatedList);
        const updatedElement = updatedList.find(item => item[0] === elementClicked[0]);
        setElementClicked(updatedElement);
        setVisible(false);
    }

    function deleteMainItem(index) {
        const updatedList = list.filter((_, i) => i !== index);
        if (elementClicked && list[index][0] === elementClicked[0]) {
            setElementClicked(null);
        }
        setList(updatedList);
    }

    function childDeleted(index) {
        const updatedList = list.map(item => {
            if (item[0] === elementClicked[0]) {
                const newChildren = item[2].filter((_, childIndex) => childIndex !== index);
                return [item[0], item[1], newChildren];
            }
            return item;
        });

        setList(updatedList);
        const updatedElement = updatedList.find(item => item[0] === elementClicked[0]);
        setElementClicked(updatedElement);
    }

    return (
        <main className="main">

            {visible && (<form className='main__notes-form'>
                <div className='main__block-form'>
                    <input type="text" className='notes-form__input' ref={inputRef} />
                    <button onClick={event => currentForm === 'main' ? handleclick(event) : childClick(event)} className='notes-form__btn'>Create</button>
                </div>
            </form>)}

            <div className="main__container">

                <div className="main__notes">

                    <ul className="notes__list">
                        {list.map((item, index) => (
                            <li className='list__list-item' key={item[0]}>

                                <button onClick={() => { setElementClicked(item); setElementActive(index); }}
                                    className={`list-item__btn ${elementActive === index ? 'active' : ''}`}>
                                    {item[1]}
                                </button>

                                <button onClick={() => deleteMainItem(index)} className='list-item__btn-deleted'>x</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => { setVisible(!visible); setCurrentForm('main') }} className="list__btn">Create list</button>
                </div>

                <div className="main__child-related">
                    <ul className="child-related__list">
                        {elementClicked && elementClicked[2].map((childItem, index) => (
                            <li className='child-related__list-item' key={index}>
                                <button className='child-related__list-item-btn'>{childItem}</button>
                                <button onClick={() => childDeleted(index)} className='child-related__btn-deleted'>x</button>
                            </li>
                        ))}
                    </ul>

                    <button onClick={() => { setVisible(!visible); setCurrentForm('child'); }} className="child-related__btn">Create child list</button>
                </div>
            </div>
        </main>
    );
}

export { Notes };