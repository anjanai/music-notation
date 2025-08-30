from moviepy.editor import ImageClip, AudioFileClip, concatenate_videoclips

# --- User inputs ---
image_files = ["img0.png", "img1.png", "img2.png", "img3.png", "img4.png", "img5.png"]  # list your images here
audio_file = "2025-08-30_hamsakinkini.m4a"
output_file = "slideshow.mp4"

# --- Load audio ---
audio = AudioFileClip(audio_file)
audio_duration = audio.duration

# --- Calculate duration per image ---
duration_per_image = audio_duration / len(image_files)

# --- Create image clips ---
clips = []
for img in image_files:
    clip = ImageClip(img).set_duration(duration_per_image).fadein(0.5).fadeout(0.5)
    clips.append(clip)

# --- Concatenate image clips ---
video = concatenate_videoclips(clips, method="compose")

# --- Add audio ---
video = video.set_audio(audio)

# --- Export video ---
video.write_videofile(output_file, fps=24)
