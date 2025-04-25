import Image from "next/image";

import AvatarBear from "./avatars/Bear.png";
import AvatarCat from "./avatars/Cat.png";
import AvatarCroc from "./avatars/Croc.png";
import AvatarHamster from "./avatars/Hamster.png";
import AvatarKoala from "./avatars/Koala.png";
import AvatarOctopus from "./avatars/Octo.png";
import AvatarTurtle from "./avatars/Turtle.png";
import AvatarDefault from "./avatars/Default.png";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

const avatarClassName = "rounded-md w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 2xl:w-56 2xl:h-56";

export function archetypeToAvatar(archetype: string) {
    switch (archetype) {
        case "bear":
            return <Image className={avatarClassName} src={AvatarBear} alt="Bear character with a space background" />;

        case "cat":
            return <Image className={avatarClassName} src={AvatarCat} alt="Cat character with a space background" />;

        case "croc":
            return <Image className={avatarClassName} src={AvatarCroc} alt="Croc character with a space background" />;

        case "hamster":
            return <Image className={avatarClassName} src={AvatarHamster} alt="Hamster character with a space background" />;

        case "koala":
            return <Image className={avatarClassName} src={AvatarKoala} alt="Koala character with a space background" />;

        case "octopus":
            return <Image className={avatarClassName} src={AvatarOctopus} alt="Octopus character with a space background" />;

        case "turtle":
            return <Image className={avatarClassName} src={AvatarTurtle} alt="Turtle character with a space background" />;

        default:
            return <Image className={avatarClassName} src={AvatarDefault} alt="A space background" />;
    }
}