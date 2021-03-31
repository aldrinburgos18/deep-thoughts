import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";

import { ADD_REACTION } from "../../utils/mutations";

const ReactionForm = ({ thoughtId }) => {
  const [reactionBody, setReactionBody] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addReaction, { error }] = useMutation(ADD_REACTION);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setReactionBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addReaction({
        variables: { reactionBody, thoughtId },
      });
    } catch (error) {
      console.error(error);
    }

    setReactionBody("");
    setCharacterCount(0);
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 ? "text-error" : ""}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        onSubmit={handleFormSubmit}
        className="flex-row justify-center justify-space-between-md align-stretch"
      >
        <textarea
          value={reactionBody}
          onChange={handleChange}
          placeholder="Leave a reaction to this thought..."
          className="form-input col-12 col-md-3"
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReactionForm;
