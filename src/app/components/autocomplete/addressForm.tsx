"use client";
import React, { useState } from "react";
import { connect } from "react-redux";
import { setSuggestions, setStartAddress, setEndAddress } from "../../../../store/actions/setAdreses";
import { GET_SUGGESTIONS_API } from "../../../../helpers/constants";
import { debounce } from "lodash";
import Autosuggest from "react-autosuggest";
import styles from "../../../../public/styles/autosuggest-theme.module.css";
import axios from "axios";

// Типы
interface Coordinates {
  lat: number;
  lon: number;
}
// Типы
interface Suggestion {
  id: string;
  label: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

interface Address {
  label: string;
  coordinates?: Coordinates;
}

interface AddressFormProps {
  type: "pickup" | "dropoff";
  suggestions: Suggestion[];
  initialAddress?: {
    label: string;
    coordinates?: {
      lat: number;
      lon: number;
    };
  };
  setSuggestionsAction: (suggestions: Suggestion[]) => void;
  setStartAddressAction: (address: Address) => void;
  setEndAddressAction: (address: Address) => void;
  onSubmit: (formData: Address) => void;
}

function AddressForm({
  type,
  suggestions = [],
  initialAddress,
  setSuggestionsAction,
  setStartAddressAction,
  setEndAddressAction,
}: AddressFormProps) {
  const [addressValue, setAddressValue] = useState(initialAddress?.label || "");

  // Загрузка подсказок адресов
  const fetchSuggestions = async (inputValue: string) => {
    if (!inputValue) {
      setSuggestionsAction([]);
      return;
    }

    try {
      const response = await axios.get(`${GET_SUGGESTIONS_API}${inputValue}`);
      setSuggestionsAction(response.data.suggestions || []);
    } catch (error) {
      console.error("Ошибка получения подсказок:", error);
      setSuggestionsAction([]);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

  // Обработчики автодополнения
  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    debouncedFetchSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestionsAction([]);
  };

  const onSuggestionSelected = (_event: React.FormEvent, { suggestion }: { suggestion: Suggestion }) => {
    const selectedAddress = {
      label: suggestion.label,
      coordinates: suggestion.coordinates,
    };

    setAddressValue(suggestion.label);
    if (type === "pickup") {
      setStartAddressAction(selectedAddress);
    } else if (type === "dropoff") {
      setEndAddressAction(selectedAddress);
    }
  };

  const onInputChange = (_event: React.FormEvent, { newValue }: { newValue: string }) => {
    setAddressValue(newValue);
  };

  // Входные параметры для автодополнения
  const inputProps = {
    placeholder: type === "pickup" ? "Откуда" : "Куда",
    value: addressValue,
    onChange: onInputChange,
    className: styles["react-autosuggest__input"],
  };

  return (
    <>
      <Autosuggest
        theme={{
          container: styles["react-autosuggest__container"],
          input: styles["react-autosuggest__input"],
          inputFocused: styles["react-autosuggest__input--focused"],
          suggestionsContainer: styles["react-autosuggest__suggestions-container"],
          suggestionsList: styles["react-autosuggest__suggestions-list"],
          suggestion: styles["react-autosuggest__suggestion"],
          suggestionHighlighted: styles["react-autosuggest__suggestion--highlighted"],
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={(suggestion: Suggestion) => suggestion.label}
        renderSuggestion={(suggestion: Suggestion) => (
          <div className="flex items-center">
            <span className="text-gray-100">{suggestion.label}</span>
          </div>
        )}
        inputProps={inputProps}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  suggestions: state.address.suggestions,
});

const mapDispatchToProps = (dispatch) => ({
  setSuggestionsAction: (suggestions) => dispatch(setSuggestions(suggestions)),
  setStartAddressAction: (address) => dispatch(setStartAddress(address)),
  setEndAddressAction: (address) => dispatch(setEndAddress(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
