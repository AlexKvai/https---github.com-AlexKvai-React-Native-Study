import axios from 'axios';
import React from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import styled from 'styled-components/native';
import Loading from './Loading';

const PostImage = styled.Image`
   border-radius: 10px;
   width: 100%;
   height: 250px;
   margin-bottom: 20px;
`;

const PostText = styled.Text`
   font-size: 18px;
   line-height: 24px;
`;

export const FullPostScreen = ({
   route,
   navigation,
}: {
   route: any;
   navigation: any;
}) => {
   const [isLoading, setIsLoading] = React.useState(true);
   const [data, setData] = React.useState<{ text: string; imageUrl: string }>({
      text: '',
      imageUrl: '',
   });
   const { id, title } = route.params;

   React.useEffect(() => {
      navigation.setOptions({
         title,
      });
      setIsLoading(true);
      axios
         .get('https://63beaf5bf5cfc0949b5e2675.mockapi.io/Posts/' + id)
         .then(({ data }) => {
            setData(data);
         })
         .catch((err) => {
            console.log(err);
            Alert.alert('Ошибка', 'Не удалось получить статью');
         })
         .finally(() => {
            setIsLoading(false);
         });
   }, []);

   return (
      <View>
         {isLoading ? (
            <Loading />
         ) : (
            <View style={{ padding: 20 }}>
               <PostImage
                  source={{
                     uri: `${data.imageUrl}`,
                  }}
               />
               <PostText>{data.text}</PostText>
            </View>
         )}
      </View>
   );
};
