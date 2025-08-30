from transformers import pipeline

# โหลดโมเดล
generator = pipeline("text2text-generation", model="google/flan-t5-base")

def suggest_jobs(user_text, num_jobs=3):
    prompt = f'Suggest {num_jobs} English job titles for this Thai text: "{user_text}"'
    result = generator(prompt, max_length=100, do_sample=True)
    return result[0]['generated_text']

if __name__ == "__main__":
    # รับ input จากผู้ใช้
    user_text = input("กรอกรายละเอียดเกี่ยวกับตัวคุณ (เช่น ทักษะ ความชอบ): ")
    jobs = suggest_jobs(user_text, num_jobs=3)
    print("\n🎯 Job Suggestions:")
    print(jobs)
