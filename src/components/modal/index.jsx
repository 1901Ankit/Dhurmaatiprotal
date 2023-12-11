import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../redux/reducer/modal';
import './index.css';

export default function Modal() {
    let dispatch = useDispatch();
    const content = useSelector((state) => state.modal.content);

    function closeModal() {
        dispatch(hideModal());
    }

    return (
        <div
            onClick={(e) => {
                if (e.target.classList.contains('modal__background')) {
                    closeModal();
                }
            }}
            className={`modal__background ${content ? 'd-flex' : 'd-none'}`}
        >
            <div className="modal__content">
                <button className="modal__content__close" onClick={closeModal}>
                    ✕
                </button>
                {content}
            </div>
        </div>
    );
}
