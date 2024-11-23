"use state";

import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Confirm } from "./Confirm";

interface CheckOutFormProps {
  addShippingMethodToCart: (
    optionId: string,
    shippingData: object,
    validCartId: string,
    validType: string
  ) => Promise<
    | {
        ok: boolean;
        data:
          | {
              ok: boolean;
              data: null;
              error: any;
            }
          | {
              ok: boolean;
              data: any;
              error: null;
            };
        error?: undefined;
      }
    | {
        ok: boolean;
        error: unknown;
        data?: undefined;
      }
    | undefined
  >;
  validCartId: string;
  validType: string;
  closeCart: (validCartId: string) => Promise<
    | {
        ok: boolean;
        error: any;
        data?: undefined;
      }
    | {
        ok: boolean;
        data:
          | {
              ok: boolean;
              data: null;
              error: any;
            }
          | {
              ok: boolean;
              data: any;
              error: null;
            };
        error?: undefined;
      }
    | undefined
  >;
}

export default function CheckOutForm({
  closeCart,
  addShippingMethodToCart,
  validCartId,
  validType,
}: CheckOutFormProps) {
  const [deliveryType, setDeliveryType] = useState("");
  const [metroStation, setMetroStation] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [consumerName, setConsumerName] = useState("");
  const [consumerLastName, setConsumerLastName] = useState("");
  const [consumerPhone, setConsumerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [warn, setWarn] = useState(false);

  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState(false);

  const deliveryHandle = () => {
    let deliveryId = "";
    let requestData = {};

    if (deliveryType === "metro") {
      deliveryId = "so_01JCKDR1NYHC7BEC8P104PBH7Z";
      requestData = {
        consumerName,
        consumerLastName,
        consumerPhone,
        metroStation,
        deliveryDate,
        deliveryTime,
      };
    } else if (deliveryType === "city") {
      deliveryId = "so_01JCKDSGCDMWBBZQWQ2VQ7NNY2";
      requestData = {
        consumerName,
        consumerLastName,
        consumerPhone,
        address,
      };
    } else if (deliveryType === "country") {
      deliveryId = "so_01JCKDY5CCK7FZ47AXVY1GQ7AF";
      requestData = {
        consumerName,
        consumerLastName,
        consumerPhone,
        address,
        city,
      };
    }

    async function addShippingMethod() {
      try {
        const response = await addShippingMethodToCart(
          deliveryId,
          requestData,
          validCartId,
          validType
        );
        if (response?.ok) {
          return true;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    }

    return addShippingMethod();
  };

  useEffect(() => {
    if (deliveryType) {
      deliveryHandle();
    }
  }, [deliveryType]);

  //
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!deliveryType) {
      setWarn(true);
      return;
    }

    async function completeCart() {
      try {
        const shipStatus = await deliveryHandle();

        if (shipStatus) {
          const response = await closeCart(validCartId);

          if (response?.ok) {
            setShowBanner(true);
            setIsComplete(true);
            setDeliveryType("");
            setAddress("");
            setCity("");
            setDeliveryDate("");
            setMetroStation("");
            if (validType === "multi") {
              localStorage.setItem("cart_id", "");
            } else {
              localStorage.setItem("singleCart_id", "");
            }
          }
        } else {
          setShowBanner(true);
          setIsComplete(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    completeCart();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 flex-1 mt-24 mb-5 px-10">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">Имя</Label>
          <Input
            onChange={(e) => setConsumerName(e.target.value)}
            id="firstName"
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Фамилия</Label>
          <Input
            onChange={(e) => setConsumerLastName(e.target.value)}
            id="lastName"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="phone">Телефонный номер</Label>
        <Input
          onChange={(e) => setConsumerPhone(e.target.value)}
          id="phone"
          type="tel"
          required
        />
      </div>

      <div>
        <Label>Тип доставки</Label>
        <RadioGroup
          onValueChange={setDeliveryType}
          id="radio"
          className="flex flex-col space-y-2 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="metro" id="so_01JCKDR1NYHC7BEC8P104PBH7Z" />
            <Label htmlFor="metro">Доставка по линии метро</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="city" id="so_01JCKDSGCDMWBBZQWQ2VQ7NNY2" />
            <Label htmlFor="city">Доставка до адреса в черте города</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="country"
              id="so_01JCKDY5CCK7FZ47AXVY1GQ7AF"
            />
            <Label htmlFor="country">
              Доставка по всей стране курьерскими службами
            </Label>
          </div>
        </RadioGroup>
      </div>

      {deliveryType === "metro" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="metroStation">Станция метро</Label>
            <Select onValueChange={setMetroStation} required>
              <SelectTrigger>
                <SelectValue placeholder="Выберите станцию метро" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="station1">Станция 1</SelectItem>
                <SelectItem value="station2">Станция 2</SelectItem>
                <SelectItem value="station3">Станция 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="deliveryDate">Дата доставки</Label>
            <Input
              id="deliveryDate"
              type="date"
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="deliveryTime">Время доставки</Label>
            <Select onValueChange={setDeliveryTime} required>
              <SelectTrigger>
                <SelectValue placeholder="Выберите время доставки" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12:00-15:00">12:00 - 15:00</SelectItem>
                <SelectItem value="15:00-18:00">15:00 - 18:00</SelectItem>
                <SelectItem value="18:00-22:00">18:00 - 22:00</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {deliveryType === "city" && (
        <div>
          <Label htmlFor="cityAddress">Адрес доставки</Label>
          <Input
            id="cityAddress"
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      )}

      {deliveryType === "country" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="countryCity">Город</Label>
            <Select onValueChange={setCity} required>
              <SelectTrigger>
                <SelectValue placeholder="Выберите город" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="moscow">Москва</SelectItem>
                <SelectItem value="saint-petersburg">
                  Санкт-Петербург
                </SelectItem>
                <SelectItem value="novosibirsk">Новосибирск</SelectItem>
                <SelectItem value="yekaterinburg">Екатеринбург</SelectItem>
                <SelectItem value="kazan">Казань</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="countryAddress">Адрес доставки</Label>
            <Input
              id="countryAddress"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-amber-500 hover:bg-amber-600 transition-all duration-300  font-semibold"
      >
        Завершить оформление
      </Button>
      {warn ? (
        <p className="w-full py-3 text-center border border-red-600 text-red-600 font-semibold">
          Необходимо выбрать метод доставки
        </p>
      ) : (
        <></>
      )}

      <Confirm isComplete={isComplete} />
    </form>
  );
}
