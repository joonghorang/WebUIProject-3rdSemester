07 파일 조회, 일기, 쓰기

- 파일 경로의 조작
- 파일 경로를 통한 정보의 추출
- 파일 디스크립터의 이해
- fs.stat()을 활용한 파일 통계 정보 캡처
- 파일 열기, 읽기, 쓰기, 닫기
- 파일 디스크립터 누수 방지 

노드는 파일을 마치 네트워크 스트림처럼 처리할 수 있는 스트리밍 API를 제공한다. 
즉, 파일을 연속적으로 처리할 수 있는 기능만 제공한다. 

노드의 파일 API 중 대바분은 유닉스 AIP를 직접 변환한 것으로 사용하는 방식이 거의 유사하다. 
따라서 마찬가지로 표준 입력, 표준 출력, 표준 에러 파일 디스크립터가 존재한다. 


파일 경로의 조작
파일 경로는 파일을 나타내며, 이들 경로는 절대 또는 상대 형식을 갖고 잇따. 
파일 경로는 서로 결합할 수 있고, 
파일명 정보를 추출할 수 있으며,
파일 존재 여부를 검사할 수도 있다. 

노드는 이 경로를 위해 path라는 모듈을 제공한다. 

경로 정규화 
경로를 저장하거나 사용하기 전에는 경로를 정규화하는 게 좋다. 
(프로그래밍 쪽에서 정규화라는 단어는 '즐겨찾기'정도의 의미인듯)
ex)
var path = require('path');
paht.nomalize('/foo/bar//baz/asdf/quux/..'); // 2개의 경로를 서로 결합
// => '/foo/bar/baz/asdf/'

경로 결합 
path.join()을 사용하면 경로를 결합할 수 있다. 
원하는 수만큼할 수 있으며 결합하려는 경로를 모두 연소긍로 념겨주면된다. 
ex)
var path = require('path');
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// => '/foo/bar/baz/asdf'

경로 해석
path.resolve()를 사용하면 일련의 경로르 정규화된 절대 경로로 해석할 수 있다. 
이 메서드는 파일에도 사용할 수 있다든 점과 추상적이라는 점을 제외하면 각 인자에 대해 인터랙티브한 cd 명령 처럼 
동작한다. 
ex)
var path = require('pah');
path.resolve('/foo/bar', './baz');
// => /foo/bar/baz
path.resolve('/foo/bar', 'tmp/file/');
// => /tmp/file

결과 경로가 절대 경로가 아니면 path.resolve는 다음 예제에서처럼 현재 작업 디렉터리를 경로 앞에 첨부한다. 
