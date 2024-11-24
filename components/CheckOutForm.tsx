"use state";

import { Suspense, useEffect, useState } from "react";
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
import Loading from "@/app/loading";

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

const stations = [
  { ru: "Дарнагуль", az: "Dərnəgül" },
  { ru: "Азадлыг Проспекти", az: "Azadlıq Prospekti" },
  { ru: "Насими", az: "Nəsimi" },
  { ru: "Мемар Аджеми", az: "Memar Əcəmi" },
  { ru: "20 Января", az: "20 Yanvar" },
  { ru: "Иншаатчылар", az: "İnşaatçılar" },
  { ru: "Эльмляр Академиясы", az: "Elmlər Akademiyası" },
  { ru: "Низами", az: "Nizami" },
  { ru: "Ичери Шехер", az: "İçəri Şəhər" },
  { ru: "Сахил", az: "Sahil" },
  { ru: "28 Мая", az: "28 May" },
  { ru: "Гянджлик", az: "Gənclik" },
  { ru: "Нариман Нариманов", az: "Nəriman Nərimanov" },
  { ru: "Улдуз", az: "Ulduz" },
  { ru: "Кероглу", az: "Köroğlu" },
  { ru: "Гара Гараев", az: "Qara Qarayev" },
  { ru: "Нефтчиляр", az: "Neftçilər" },
  { ru: "Халглар Достлугу", az: "Xalqlar Dostluğu" },
  { ru: "Ахмедли", az: "Əhmədli" },
  { ru: "Хази Асланов", az: "Həzi Aslanov" },
  { ru: "Хатаи", az: "Xətai" },
  { ru: "Автовокзал", az: "Avtovağzal" },
  { ru: "Ходжасан", az: "Xocəsən" },
  { ru: "8 Ноября", az: "8 Noyabr" },
  { ru: "Бакмиль", az: "Bakmil" },
];

export default function CheckOutForm({
  closeCart,
  addShippingMethodToCart,
  validCartId,
  validType,
}: CheckOutFormProps) {
  const [deliveryType, setDeliveryType] = useState("");
  const [metroStation, setMetroStation] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [deliveryTime, setDeliveryTime] = useState("");
  const [consumerName, setConsumerName] = useState("");
  const [consumerLastName, setConsumerLastName] = useState("");
  const [consumerPhone, setConsumerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [warn, setWarn] = useState(false);

  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Функция для загрузки данных из API
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "https://api.opendata.az/v2/az/json/map/geographic/district"
        );
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        const data = await response.json();
        setCities(data.districts);
      } catch (error) {
        console.error("Ошибка загрузки городов:", error);
      }
    };

    fetchCities();
  }, []);

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
        deliveryDate,
        deliveryTime,
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
                {stations.map((station) => (
                  <SelectItem key={station.az} value={station.az}>
                    {station.az}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="deliveryDate">Дата доставки</Label>
            <Input
              id="deliveryDate"
              type="date"
              value={deliveryDate}
              min={new Date().toISOString().split("T")[0]}
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
        <div className="space-y-4">
          <Label htmlFor="cityAddress">Адрес доставки</Label>
          <Input
            id="cityAddress"
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <div>
            <Label htmlFor="deliveryDate">Дата доставки</Label>
            <Input
              id="deliveryDate"
              type="date"
              value={deliveryDate}
              min={new Date().toISOString().split("T")[0]}
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

      {deliveryType === "country" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="countryCity">Город</Label>

            <Select onValueChange={setCity} required>
              <SelectTrigger>
                <SelectValue placeholder="Выберите город" />
              </SelectTrigger>
              <SelectContent>
                <Suspense fallback={<Loading />}>
                  {cities.map((city: any) => (
                    <SelectItem key={city.id} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </Suspense>
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
