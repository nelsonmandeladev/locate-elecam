"use client";

import React from 'react'
import BaseMarker from './base-marker';
import { ArrowRightLeft, Eye, MapPin, MapPinned } from 'lucide-react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components';
import { LocationType } from '@/types/app.type';
import Image from 'next/image';
import { truncateText } from '@/lib';
import { useTranslation } from 'react-i18next';
interface LocationMarkerProps {
    map: google.maps.Map | null;
    position: google.maps.LatLngLiteral;
    location: LocationType
}


export function LocationMarker(props: LocationMarkerProps) {
    const { map, position, location } = props;
    const { t } = useTranslation();
    return (
        <BaseMarker
            position={position}
            map={map}
        >
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        size={"icon"} variant={"ghost"} className='size-[50px] bg-transparent hover:bg-transparent'
                    >
                        <MapPin className='text-blue-700 cursor-pointer' size={50} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 h-full rounded p-3" side='top' sideOffset={5}>
                    <div className="flex flex-col gap-3 w-full">
                        <div className="aspect-auto rounded relative cursor-pointer h-[75px] md:min-h-[180px] md:max-h-[180px] bg-gray-100">
                            <Image
                                src={location.image.url ?? ""}
                                alt={location.image.pathname ?? ""}
                                width={96}
                                height={96}
                                className='w-full h-full rounded object-cover'
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-lg font-semibold text-gray-600 flex justify-start items-start gap-3">
                                <MapPinned size={50} className='text-primary' />
                                {location.formatted_address}
                            </h4>
                            <p className="text-[16px] text-gray-600">
                                {truncateText(location.description, 70)}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button size={"sm"} variant={"outline"} className='flex gap-2 text-[16px] font-normal text-gray-600'>
                                <ArrowRightLeft />
                                {t("common:key_get_direction")}
                            </Button>
                            <Button size={"icon"}>
                                <Eye />
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </BaseMarker>
    )
}
