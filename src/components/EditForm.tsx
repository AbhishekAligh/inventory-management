import {
  Field,
  Input,
  Label,
  Dialog,
  DialogPanel,
  DialogTitle,
  Button,
  Fieldset,
  Description,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { IItem } from "../store/inventoryStore";

interface EditModalFormProps {
  initialState: IItem | null;
  onClose: () => void;
  onSave: (updatedForm: IItem | null) => void;
  isOpen: boolean;
}

function EditForm(props: EditModalFormProps) {
  const { initialState, onClose, onSave, isOpen } = props;

  const [formData, setFormData] = useState<IItem | null>(null);

  useEffect(() => {
    setFormData(initialState);
  }, [initialState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!formData) {
      return;
    }
    setFormData((prevState) => {
      if (!prevState) {
        return null;
      }
      if (name === "price" || name === "value") {
        return {
          ...prevState,
          [name]: `$${value}`,
        };
      }
      return {
        ...prevState,
        [name]: name === "quantity" ? parseFloat(value) : value,
      };
    });
  };

  const handleSave = () => {
    console.log("Form Data:", formData);
    onSave(formData);
  };

  return ReactDOM.createPortal(
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 bg-[#2E312C] rounded-xl py-8 px-6">
            <div className="flex justify-between items-center">
              <div>
                <DialogTitle className="font-bold">Edit Product</DialogTitle>
                <Description>{formData?.name}</Description>
              </div>
              <Button
                className="rounded bg-[#2C2D2B] py-2 px-4 text-lg font-bold text-[#9DA758] data-[active]:bg-sky-700"
                onClick={onClose}
              >
                X
              </Button>
            </div>
            <Fieldset className="grid grid-cols-2 gap-6">
              <Field>
                <Label className="block text-xs">Category</Label>
                <Input
                  className="mt-1 block rounded-md bg-[#484A46]"
                  name="category"
                  value={formData?.category}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <Label className="block text-xs">Price</Label>
                <Input
                  className="mt-1 block rounded-md bg-[#484A46]"
                  name="price"
                  value={formData?.price ? formData.price.split("$")[1] : 0}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <Label className="block text-xs">Quantity</Label>
                <Input
                  className="mt-1 block rounded-md bg-[#484A46]"
                  name="quantity"
                  value={formData?.quantity}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <Label className="block text-xs">Value</Label>
                <Input
                  className="mt-1 block rounded-md bg-[#484A46]"
                  name="value"
                  value={formData?.value ? formData.value.split("$")[1] : 0}
                  onChange={handleInputChange}
                />
              </Field>
            </Fieldset>
            <div className="flex gap-4 justify-end">
              <Button className="text-[#9DA758]" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="bg-[#484A46] rounded-lg py-1 px-4 hover:bg-[#9DA758]"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
}

export default EditForm;
