import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { primaryColor } from '@/assets/colors'
import { StarHalfIcon, StarIcon, StarTransparent } from '@/assets/icons'
import { StarsType } from '@/utils/types'

const Stars: React.FC<StarsType> = ({
  total = 5,
  active = 0,
  color = primaryColor.default,
  starSize = 20,
  horizontal
}) => {
  const [stars, setStars] = useState<React.ReactNode[]>([])

  useEffect(()=>{

    let availableStars: React.ReactNode[] = [];

    for(let i = 0; i < total; i++){
      var remainingStars = active - i;
      if(remainingStars > 0){

        if(remainingStars < 1){

          availableStars.push(<StarHalfIcon key={i} size={starSize} color={color} />)

        }else{

          availableStars.push(<StarIcon key={i} size={starSize} color={color} />)

        }

       

      }else{
        availableStars.push(<StarTransparent key={i} size={starSize} color={color} />)
      }
    }

    setStars(availableStars)

  }, [total, active, color, starSize])

  return (
    <View style={{
      gap: 1,
      alignItems: horizontal? "center" : "flex-start",
      flexDirection: horizontal? "row" : "column",

    }}>
      {stars}
    </View>
  )
}

export default Stars

const styles = StyleSheet.create({})