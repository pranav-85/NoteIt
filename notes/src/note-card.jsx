import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Editor, EditorState, ContentState } from "draft-js/dist/Draft";
import "draft-js/dist/Draft.css";
import "./note-card.css";

function NoteCard(props) {
  const [isHovered, setIsHovered] = useState(false);

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(props.content))
  );

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(props.content))
    );
  }, [props.content]);

  const onSaveButtonClick = () => {
    const contentState = editorState.getCurrentContent();
    const content = contentState.getPlainText();
    props.onSaveClick(props.id, content);
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleNameChange = (event) => {
    props.onNameChange(props.id, event.target.value);
  };
  return (
    <div
      className={`note-card ${props.editStatus ? "editing" : ""} ${
        !props.editStatus && !props.allEditStatus ? "editing-mode" : ""
      }`}
      id={props.id}
    >
      {props.editStatus ? (
        <div className="editor-field scroll-container">
          <Editor
            editorState={editorState}
            onChange={handleEditorChange}
            spellCheck={true}
          />
        </div>
      ) : (
        <div
          className="note-preview"
        >
          <div className="note-dates">
            <p>Created: {new Date(props.createdOn).toLocaleString()}</p>
            <p>Last Edited: {new Date(props.editedOn).toLocaleString()}</p>
          </div>
          <p>{props.content}</p>
        </div>
      )}

      <hr className="line" />
      <div className="note-info">
        <div className="note-name">
          <input type="text" value={props.name} onChange={handleNameChange} />
        </div>

        <button
          className="pin-button"
          disabled={!props.editStatus && !props.allEditStatus}
          onClick={() => props.onPinClick(props.id)}
          style={{
            backgroundColor: props.pinStatus
              ? "rgba(50, 133, 216, 0.847)"
              : "white",
          }}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADCElEQVR4nNXZO2gUQRwG8InGNwgG3Jnvm3FD5LQICkpEQUQELRSJYCNWNgqKL0RBxUdjlUoQtEib2IqFphEUjILgo7ENWGgRSRHjg+TiIyuDG3Ie99jb29nHB1Pe3vx2Z/47MytEPrKI5HWS4yQnAJwXRQzJOySDqnZTFClKqQMk52pAApI3RBEipfRIfq6DCGwDcE3kPB0ARhohuIC5KvIakhejILiAuSzyFinlJgAzrUBIzgE4J/KS7u7u5QDet4gI5jEkz4g8BMDdmIigAnM6U4RSan+DUtsq5lSWpXY8AUQwj1FKncyi1D5KEBGE7Y/W+ljSne00xpQA7CK5j+ROkhuFEIvt2skBIgjbbwCH2+q5MUbb+k5yFEC5Tv0vA5h1CAlIfogFkFL2kBwC8NNxB4MoDcBkq4YOkpcATGfdef7fBiILjDErSD7MQaeDqjZs52FkSNQFXorD6UusikXyRdad50J7QnKdiBOl1No21khJPYVpAFfs1jgWIg8YAK/C91IySRsDYCZ8CtEndN4w+PcfWxIHpIj5Zd8Nvb29S50iXGIATCqltqUCcIz50XZVygvG87z1qSO6urpWJ43RWu9IFWHvXLjr608Yszc1RLiIfBdOULvfOJQUxhizPTUIyftV1aastT6YBEZK2ZMKAsCFOqVzNoFh9i2VqqWU2t1oZ2ifjD32iYsB8NQ5wu7Rm52eh535JKVcFQcD4KxTRKlUWhauQJt15i0Av/K3UTEAyvb8yymE5GAExDCAlbV+HwUD4J5TBIDjTTowG+U8tgnmq9baOEOQ3Nrk1GRCa70n6vXqYQCccIaw4xXAxwaIl77vo9Xr1sAM2aMm4SidAJ41Gs/t7Bcsxt4Ikg+c7jsA3K5XWeycEUUIyaP13g+proPaiTFms93c1IA89zxPiiLE9/01AMZqIAb7+vqWiIJkEYDHVYDvJI+IIgXArar5MGaHmShSSPbbz1gViBE7zESRorXeAGCq4mvpQGanGO2E5OvwKUzNb4oKGZKjJN8kekCcQf4C0KyHHnmSfV8AAAAASUVORK5CYII=" />
        </button>
        {props.editStatus ? (
          <button className="save-button" onClick={onSaveButtonClick}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFElEQVR4nO2aO07EMBRF3SDYwj0elCY7yDIBsQwqOj4rYmYXBI3kggYyjuPEytwjuUnxnON3lacoCcEYk03XdXfAM3ACxi2WpJdhGG5CCUlibGC9FslMdaLolC7bf/zVmbe+72+LC20tQolMayLMlaktMlWPvx8AeTKtipAr07IIOTKti5DmzC5EgO+9iIwWwR3Jg7WiFWM8VJS4X00E+DhvWEnic02RJlawCNt3AXeE7U8ed4Qr6Yik95pDMcZ4SLOqrkhNiZwJH6YoLrAQWCThjiwMjlbC0VoYHK2Eo7UwOFp7jlb451ptKL2PPYmcWo+WpK/JApKe1nzTm7MkPVz0w8BZRtKxQYGjpMfZn6yNuVJ+ABWZ9bN/eOltAAAAAElFTkSuQmCC" />
          </button>
        ) : (
          <button
            className="edit-button"
            disabled={!props.editStatus && !props.allEditStatus}
            onClick={() => props.onEditClick(props.id)}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACS0lEQVR4nO2ZT4hNURzHfzT+bSwG43y+59bbTMqUqLehlD8pC1aTUlhIsRMbCynZsmGKha3Y+LORjWKtFIlELGRh5H+KBWMcnTqvnul5bx7vzb133E+dzbmnzu/T73fO/XWvWUVFS7IsWyXppaSLZjZgZcQ5t1LSa0khjav1en2elVwilE6mjUQojcw0JELhZbqQCIWV+QuJUDiZf5AIhZHpgUTIXaaHEiE3mT5IhBmXSW3H2z5IhDQuzQaJALwqazmFpvHFe7+xkmhHlQn9X+X0dbZIbKok2lFlQlU59Y6qnFSVU+8YHBxcLOlNvxtA59wG6yfAgbTZXeBh6brYBsCdtOHO+F22lBKSVsQNgQ+1Wm1hjzMS247NfZeISDqZRM6a2VxJEymIx5KOS9oLnGqaL1YmEgPAeBKpxwlgq3NuNEpZE5JOd5mJGZMw7/22tPGjTmuB/YUrpwbAlZSNw9YBScdyb8VbIWkJ8C0O59wym/7NVhyJCHAwBXDNOuC9X1tIiQhwPwWx3TogaQ3wUdILSffiVZ3rmWjgvV+dzsZ4tz8lJa0DLucuEZF0ppvPkd77DDgq6cmU90R+EiMjI/MlvUvB/JS0r9W6LMsWAbsk3ZQ02RAAHgCHgKWWJ8650SkHddI5t6fxPL4YJY0B75uC/yTpPLDeigJwvcWtMwGcA541zf0AbnjvdwwPDy+wIjE0NLQc+N7uKgWeAiecczUrKpKO/EHgs6QLkraY2RwrOvzeok8Ct4Dd8WBbmQBuA89je17o0qmwcvAL6DD6BGXm1NgAAAAASUVORK5CYII=" />
          </button>
        )}
        <button
          className="delete-button"
          disabled={!props.editStatus && !props.allEditStatus}
          onClick={() => props.onDeleteClick(props.id)}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE8ElEQVR4nO1aXYxdUxQ+JTR+Egm9c/e39r5Dx23U+HsYKlEPePAT1AOJFn1BUkWL8KAkrQSljGjrBYOWaD1g0Ep5UImS+EuUlnqgrbT1LzF0RlLRHlnTdWRyZq3Tc+850zkPdrJfznfWWt+3z9p7r73vjaKSWnd39+FEtATAD0QUZ3UA3xPRQ2wTVa0R0cMHEqD0xVHVGvaPMpM7J8e705MvE1WtkYzyWL1fqNXr9Q4ieo2IhtpIm7L6EBH1M5e2hRDRhnEUEKf6ey2Rd87VADwPYKAC5OPUajcAYCWASZki+AUAu8abMB1Y0E4iOi5LyLPjTZLy974sIb9VgGCcs/9qCiGidRUgGOfs63JO+/9bdRoRrapA6sRGfzG3EAD3VYBwbPRFrQi5tgKEY60DuCa3EOfcWYajT5xzs2VD0oLsAXCr1GcWmX4A8wD8bfjYwTGI6FMNZ265hXR1dR1jBJkvX+wxg+SXjHvvz7CEeO9P53f4XSNGr8S4TcOZW24hEugXJcijgt1ikPiW8Y6Oji5LSL1enyw+thrv3CxCehXs55ZESKAPFEevMuacu8Qg8aMIqWcIGS7HiegnI3UuFrxfwd9vWQiAFcqIbxRsqkH0T8ZrtdrRGUKOEqK7jXdOkhifK/Gfa0fIPRbRZrM5kYj2KvjeKIomcCeifQq+bwSu2jebzYki9A9FyIKWhXjvrzLmwfBZwFq5QghHCBHtVDkotkcavnckZyIj7a5sR4i68oQQpmWdHhOh2mKRTFaLKMkp0Ht/dtaK11LjXDbSY6aM6kpjDpwgQrYp+FbxPdkYhBXie5aWlsn8arlpp0WeO0J0kSHkFME3K7abRMipxhdZKLb3KrY72xIhQt61Tmay+5qpB+AjhcyHWanjnLtOhDyj2K5vWwgRPWU5BHCukcfnC75esX1HhFxgpNZ0awABPFlEyF1KwO2MNRoNMtLjciHzhoK9Ln5naLadnZ0Q/DsFv7OIEC3gP3L5PMFYYocXAyJarWCrrMkM4C/22dPTcxjHsAaoreacO9mYB00hu0UhdINgfYrt0yLkRgX7ijHv/RQj7aYW/alg1OgAuFAIvWlVyES0VCH0uFXZAlgr2EUZWdB+M6rUmwRbbi3PAB5QsPut5ZWIlgk216qqiwp5Wwm6hDHv/R0K9qAIWaAQult8Llaw28XuEcXnW2UIeUIJ+rIEvUIJulSw+YrdPPG5TLGbIdgrCra8sBCD0GeMce1jbZg86RXsemvDCyGcJnYbrQEo1PigozgeyDh3rBayMxXsaiH7UhpjX9F+bNSvALwAFBbSaDRO1JbD5DY8XeXyRijPL0vbeO8vFbJrtKoYwCQtFh+dCwuJouhQvh2xbjPSNVVSwnCpogg5TytBkhoshDBN+Rp7mEMZQnh0v7bSJL2DszCL1AjxH2s7PunpuKUUEUYq/HfsVPaLzfycy3lFSLd2FZTsL1CO10mqliWkN6PcSK9O2/i5c+54hVSnCNlurGZ91hVUKc05N0cJ8EUURYfwPVQKG+RLNCO1zpTLv8EUNpd9Adik2MwpTYg2cUXMLm0hAPC7cd2zW7BRE3rEHw5i7XxTlpCgBTkYPYTgSxMiZ490OhyMPiT3YOU1rXQY6w652azCv3+K9oWlC6nVas66XRyjr/FNCOHY0oVwk72Bd3L1Jr2kzr5faHWS/wu/nRO/sxVS3gAAAABJRU5ErkJggg==" />
        </button>
      </div>
    </div>
  );
}

NoteCard.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pinStatus: PropTypes.bool.isRequired,
  editStatus: PropTypes.bool.isRequired,
  createdOn: PropTypes.instanceOf(Date),
  editedOn: PropTypes.instanceOf(Date),
  allEditStatus: PropTypes.bool.isRequired,
  onPinClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default NoteCard;
