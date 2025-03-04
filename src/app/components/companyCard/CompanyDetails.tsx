import React, { useState } from "react";
import { connect } from "react-redux";
import { updateCompany } from "../../../../store/actions/auth";
import EditModal from "./EditModal";
import CardComponent from "./CardComponent";

const CompanyDetails = ({ userData, loading, error, updateCompany }) => {
  const company = userData?.company;

  const [isEditOpen, setEditOpen] = useState(false);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [localError, setLocalError] = useState(null);

  const handleEdit = (field, value) => {
    setEditField(field);
    setEditValue(value);
    setLocalError(null);
    setEditOpen(true);
  };

  const handleSave = () => {
    const updateData = { [editField]: editValue };
    updateCompany(updateData);
    if (!error) {
      setEditOpen(false);
    } else {
      setLocalError("Ошибка сохранения");
    }
  };

  return (
    <>
      <CardComponent header="Детали компании" company={company} onEdit={handleEdit} />

      <EditModal
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
        editField={editField}
        editValue={editValue}
        setEditValue={setEditValue}
        localError={localError}
        error={error}
        loading={loading}
        onPress={handleSave}
        company={company}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = { updateCompany };

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
