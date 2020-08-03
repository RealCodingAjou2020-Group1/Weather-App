## Weather App

### 구현사항
* startPage 추가
    * TouchableOpacity 컴포넌트를 사용하여 터치 이벤트를 사용할 수 있는 뷰를 만들었다.
        ```js
        <TouchableOpacity
            style={styles.button}
            onPress={() => this.onPressCity()}>
            <Text style={styles.text}>City List</Text>
        </TouchableOpacity>
        ```
    * 시각적인 이미지를 추가하여 사용자가 보다 이해하기 쉽게 구현하였다.
        ```js
            <Image style={styles.image} source={require('./weather.png')}/>
        ```
    * 스타일 속성을 사용하여 보다 사용자가 보기 좋게 구현하였다.(사진 크기, text 크기 및 색상 등)

    
