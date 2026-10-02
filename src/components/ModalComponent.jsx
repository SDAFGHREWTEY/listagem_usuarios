function ModalComponent({ children, onFechar }) {
    return (
        <div className="modal-overlay" onClick={onFechar}>
            <div
                className="modal"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="modal-fechar"
                    onClick={onFechar}
                >
                    ×
                </button>

                {children}
            </div>
        </div>
    );
}

export default ModalComponent;