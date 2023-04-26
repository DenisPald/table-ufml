import datetime

from flask import Flask, jsonify, make_response, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config[
    'SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@db:5432/postgres"
db = SQLAlchemy(app)


class DaySchedule(db.Model):
    __tablename__ = 'day_schedule'

    id = db.Column(db.Integer, unique=True, primary_key=True)
    lessons_id = db.Column(db.types.ARRAY(db.Integer))
    group = db.Column(db.Integer)
    day_of_week = db.Column(db.Integer)
    date = db.Column(db.Date)

    #TODO
    # last_change = db.Column(db.DateTime)

    def json(self):
        return {
            'id': self.id,
            'lessons_id': self.lessons_id,
            'group': self.group,
            'day_of_week': self.day_of_week,
            'date': self.date.isoformat()
        }


# TODO
# class Group(SqlAlchemyBase, SerializerMixin):
#     __tablename__ = 'group'
#     last_change = db.Column(db.DateTime)


class Lesson(db.Model):
    __tablename__ = 'lesson'
    id = db.Column(db.Integer, unique=True, primary_key=True)
    subject = db.Column(db.Text)
    teacher = db.Column(db.Text)
    audience = db.Column(db.Integer)
    time = db.Column(db.Time)

    def json(self):
        return {
            'id': self.id,
            'subject': self.subject,
            'teacher': self.teacher,
            'audience': self.audience,
            'time': self.time.isoformat()
        }


# TODO: сделать ссылку на учителя в базе данных
# class Teacher(SqlAlchemyBase, SerializerMixin):
#     __tablename__ = 'teacher'

with app.app_context():
    db.create_all()


@app.route('/test', methods=['GET'])
def test():
    return make_response(jsonify({'message': 'test route'}), 200)


@app.route('/lesson/<int:id>', methods=['GET'])
def get_lesson(id):
    try:
        lesson = Lesson.query.filter_by(id=id).first()
        if lesson:
            return make_response(jsonify({'lesson': lesson.json()}), 200)
        return make_response(jsonify({'message': 'lesson not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': f'error {e}'}), 500)


@app.route("/lesson/create", methods=["POST"])
def lesson_create():
    try:
        data: dict = request.get_json()
        lesson = Lesson(subject=data['subject'],
                        teacher=data['teacher'],
                        audience=int(data['audience']),
                        time=data['time'])
        db.session.add(lesson)
        db.session.commit()
        return make_response(jsonify({"id": lesson.id}), 200)

    except Exception as e:
        return make_response(jsonify({"message": f"error {e}"}), 500)


@app.route('/schedule/<int:id>', methods=['GET'])
def get_schedule_by_id(id):
    try:
        schedule = DaySchedule.query.filter_by(id=id).first()
        if schedule:
            return make_response(jsonify({'schedule': schedule.json()}), 200)
        return make_response(jsonify({'message': 'schedule not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': f'error {e}'}), 500)


@app.route('/schedule/<int:group>/<string:date>', methods=['GET'])
def get_schedule(group, date):
    try:
        schedule = DaySchedule.query.filter_by(group=group, date=date).first()
        if schedule:
            return make_response(jsonify({'schedule': schedule.json()}), 200)
        return make_response(jsonify({'message': 'schedule not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': f'error {e}'}), 500)


@app.route("/schedule/create", methods=["POST"])
def schedule_create():
    try:
        data: dict = request.get_json()
        date = datetime.date(year=int(data['date'][:4]),
                             month=int(data['date'][5:7]),
                             day=int(data['date'][8:10]))
        schedule = DaySchedule(lessons_id=data['lessons_id'],
                               group=int(data['group']),
                               date=date,
                               day_of_week=date.isoweekday())
        db.session.add(schedule)
        db.session.commit()
        return make_response(jsonify({"id": schedule.id}), 200)

    except Exception as e:
        return make_response(jsonify({"message": f"error {e}"}), 500)
