import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading = () => {
   return (
      <View
         style={{
            marginTop: `100%`,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <ActivityIndicator size='large' />
      </View>
   );
};

export default Loading;
